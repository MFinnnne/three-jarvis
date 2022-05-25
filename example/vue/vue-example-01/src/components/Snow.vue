<template>
    <div id="WebGL-output">
    </div>
</template>

<script setup lang="ts">

import * as THREE from 'three';
import {BufferGeometry, Points} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {onMounted} from 'vue';
import SimplexNoise from "simplex-noise";
import {Water} from "three/examples/jsm/objects/Water";
import {Sky} from "three/examples/jsm/objects/Sky";


let scene,
    camera,
    renderer,
    orbitControls,
    particles,
    planeMesh,water,sun;
const textureSize = 64.0;
const noise = new SimplexNoise();
const particleNum = 20000;
const maxRange = 1000;
const minRange = maxRange / 2;
const parameters = {
    elevation: 0,
    azimuth: 180
};
let pmremGenerator;
let sky;


onMounted(() => {
    init();
    render();
});
const drawRadialGradation = (ctx, canvasRadius, canvasW, canvasH) => {
    ctx.save();
    const gradient = ctx.createRadialGradient(canvasRadius, canvasRadius, 0, canvasRadius, canvasRadius, canvasRadius);
    gradient.addColorStop(0, 'rgba(255,255,255,1.0)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasW, canvasH);
    ctx.restore();
}

const getTexture = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const diameter = textureSize;
    canvas.width = diameter;
    canvas.height = diameter;
    const canvasRadius = diameter / 2;

    /* gradation circle
    ------------------------ */
    drawRadialGradation(ctx, canvasRadius, canvas.width, canvas.height);

    /* snow crystal
    ------------------------ */
    // drawSnowCrystal(ctx, canvasRadius);

    const texture = new THREE.Texture(canvas);
    //texture.minFilter = THREE.NearestFilter;
    texture.type = THREE.FloatType;
    texture.needsUpdate = true;
    return texture;
}

function init() {

    /* scene
 -------------------------------------------------------------*/
    scene = new THREE.Scene();
    // scene.fog = new THREE.Fog(0x000036, 0, minRange * 3);

    /* camera
    -------------------------------------------------------------*/
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 20000);
    camera.position.set(30, 30, 100);
    camera.lookAt(scene.position);
    sun = new THREE.Vector3();
    /* renderer
    -------------------------------------------------------------*/
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(new THREE.Color(0x000036));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    //renderer.setClearAlpha(0);

    /* OrbitControls
    -------------------------------------------------------------*/
    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.autoRotate = false;
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.2;

    /* AmbientLight
    -------------------------------------------------------------*/
    const ambientLight = new THREE.AmbientLight(0x666666);
    scene.add(ambientLight);

    /* SpotLight
    -------------------------------------------------------------*/
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.distance = 2000;
    spotLight.position.set(-200, 700, 0);
    spotLight.castShadow = true;
    scene.add(spotLight);


    /**
     * water
     */
    const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

    water = new Water(
        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load( '../../static/waternormals.jpg', function ( texture ) {

                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            } ),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: scene.fog !== undefined
        }
    );

    water.rotation.x = - Math.PI / 2;

    scene.add( water );

    // Skybox

    sky = new Sky();
    sky.scale.setScalar( 1000 );
    scene.add( sky );

    const skyUniforms = sky.material.uniforms;

    skyUniforms[ 'turbidity' ].value = 10;
    skyUniforms[ 'rayleigh' ].value = 2;
    skyUniforms[ 'mieCoefficient' ].value = 0.005;
    skyUniforms[ 'mieDirectionalG' ].value = 0.8;

    const parameters = {
        elevation: 2,
        azimuth: 180
    };

    pmremGenerator = new THREE.PMREMGenerator( renderer );
    updateSun();
    /* Snow Particles
    -------------------------------------------------------------*/
    const pointGeometry = new BufferGeometry();
    const vertices = [];
    for (let i = 0; i < particleNum; i++) {
        const x = Math.floor(Math.random() * maxRange - minRange);
        const y = Math.floor(Math.random() * maxRange - minRange);
        const z = Math.floor(Math.random() * maxRange - minRange);
        vertices.push(x)
        vertices.push(y)
        vertices.push(z)

        // const color = new THREE.Color(0xffffff);
        // pointGeometry.colors.push(color);
    }
    pointGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));

    const pointMaterial = new THREE.PointsMaterial({
        size: 8,
        color: 0xffffff,
        vertexColors: false,
        map: getTexture(),
        // blending: THREE.AdditiveBlending,
        transparent: true,
        // opacity: 0.8,
        fog: true,
        depthWrite: false
    });

    const velocities = [];
    for (let i = 0; i < particleNum; i++) {
        const x = Math.floor(Math.random() * 6 - 3) * 0.1;
        const y = Math.floor(Math.random() * 10 + 3) * -0.05;
        const z = Math.floor(Math.random() * 6 - 3) * 0.1;
        const particle = new THREE.Vector3(x, y, z);
        velocities.push(particle);
    }

    particles = new Points(pointGeometry, pointMaterial);
    particles.geometry.velocities = velocities;
    scene.add(particles);

    /* resize
    -------------------------------------------------------------*/
    window.addEventListener('resize', onWindowResize);

    /* rendering start
    -------------------------------------------------------------*/
    document.getElementById('WebGL-output').appendChild(renderer.domElement);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}


function updateSun() {

    const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
    const theta = THREE.MathUtils.degToRad( parameters.azimuth );

    sun.setFromSphericalCoords( 1, phi, theta );

    sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
    water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

    scene.environment = pmremGenerator.fromScene( sky ).texture;

}

//
function render() {
    orbitControls.update();
    const posArr = particles.geometry.attributes['position'].array;
    const velArr = particles.geometry.velocities;
    for (let i = 0; i < velArr.length; i++) {
        const velocity = velArr[i];
        const x = i * 3;
        const y = i * 3 + 1;
        const z = i * 3 + 2;

        const velX = Math.sin(Date.now() * 0.001 * velocity.x) * 0.1;
        const velZ = Math.cos(Date.now() * 0.0015 * velocity.z) * 0.1;

        posArr[3*i] += velX;
        posArr[3*i + 1] += velocity.y;
        posArr[3*i + 2] += velZ;
        // console.log(posArr[i], '----', posArr[i + 1], '-----', posArr[i + 2])
        if (posArr[3*i + 1] < -minRange) {
            posArr[3*i + 1] = minRange;
        }
    }
    const time = performance.now() * 0.001;
    water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
    particles.geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
    requestAnimationFrame(render.bind(this));
}

</script>

<style scoped>

</style>
