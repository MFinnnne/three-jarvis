<script setup lang='ts'>
import * as THREE from 'three';
import {BoxGeometry, DirectionalLight, Group, MeshBasicMaterial, PointLight, PointLightHelper} from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {onMounted} from 'vue';
import ThreeJarvis from '../../../../../src/index.ts'
import {TransformControls} from "three/examples/jsm/controls/TransformControls";

let camera, rawScene,  renderer, control;

onMounted(() => {
    init();
    render();
});

function init() {

    const container = document.createElement('div');
    document.getElementById('container').appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 1000);
    camera.position.set(100, 100, 100);
    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    const light2 = new DirectionalLight(0xffffff, 1);
    light2.position.set(0.5, 0, 0.866); // ~60º
    light2.name = 'main_light';
    const pointLight = new PointLight(0xffffff, 1);
    let pointLightHelper = new PointLightHelper(pointLight,5,0xffff00);
    pointLight.name = 'point_light';

    setTimeout(()=>{pointLight.name="111QQQ"},5000)

    // new RGBELoader().setPath()
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.LinearEncoding;
    container.appendChild(renderer.domElement);

    control = new OrbitControls(camera, renderer.domElement);// use if there is no animation loop
    control.minDistance = 2;
    control.maxDistance = 1000;
    control.target.set(0, 0, 0);
    control.update();
    rawScene = new THREE.Scene();


    ThreeJarvis.init(rawScene, camera, renderer, container,{control});
    rawScene.add(pointLight);
    // rawScene.add(pointLightHelper)
    rawScene.add(light);
    rawScene.add(light2);

    let group = new Group();
    group.name = 'cube';
    const boxGeometry = new BoxGeometry(10, 10, 10);
    const material = new MeshBasicMaterial({color: 0x00ff00});
    const mesh = new THREE.Mesh(boxGeometry, material);
    rawScene.add(group);
    group.add(mesh)
    // let transformControls = new TransformControls(camera,renderer.domElement);
    // transformControls.attach(group)
    // transformControls.addEventListener( 'dragging-changed', function ( event ) {
    //     control.enabled = ! event.value;
    // });
    // rawScene.add(transformControls);
    // group.add(mesh);
    mesh.position.set(0, 0, 0);
    // material.wireframe = true;
    rawScene.add(camera);
    const loader = new GLTFLoader().setPath('../../static/');
    window.addEventListener('resize', onWindowResize);
    loader.load('test.glb', function (gltf) {
        rawScene.add(gltf.scene);
        gltf.scene.scale.set(0.01, 0.01, 0.01);
    });
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function render() {
    requestAnimationFrame(render);
    renderer.render(rawScene, camera);
    control.update();
}


</script>

<template>
    <div>
        <div id='container'></div>
    </div>
</template>

<style scoped>

</style>
