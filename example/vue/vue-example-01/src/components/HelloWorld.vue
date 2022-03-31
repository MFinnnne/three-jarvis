<script setup lang='ts'>
import * as THREE from 'three';
import { Box3Helper, BoxGeometry, BoxHelper, DirectionalLight, MeshBasicMaterial } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { onMounted } from 'vue';
import ThreeHelper from 'three-helper';




let camera, scene, renderer, controls;

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
    const light2 = new DirectionalLight(0xffffff, 4);
    light2.position.set(0.5, 0, 0.866); // ~60º
    light2.name = 'main_light';
    scene = new THREE.Scene();
    scene.add(light);
    camera.add(light2);
    const boxGeometry = new BoxGeometry(10, 10, 10);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(boxGeometry, material);
    material.wireframe = true;
    scene.add(mesh);
    const loader = new GLTFLoader().setPath('../../static/');


    // new RGBELoader().setPath()
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.LinearEncoding;
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);// use if there is no animation loop
    controls.minDistance = 2;
    controls.maxDistance = 1000;
    controls.target.set(0, 0, -0.2);
    controls.update();

    window.addEventListener('resize', onWindowResize);
    loader.load('test.glb', function(gltf) {
        scene.add(gltf.scene);
        gltf.scene.scale.set(0.01, 0.01, 0.01);
        ThreeHelper.init(scene, camera,renderer,controls);
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
    renderer.render(scene, camera);
    controls.update();
}


</script>

<template>
    <div>
        <div id='container'></div>
    </div>
</template>

<style scoped>

</style>
