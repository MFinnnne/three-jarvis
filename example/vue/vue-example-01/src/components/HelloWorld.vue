<script setup lang="ts">
import * as THREE from "three";
import {BoxGeometry, DirectionalLight, Group, MeshBasicMaterial, PointLight, PointLightHelper} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {onMounted} from "vue";
import ThreeJarvis from "../../../../../src/index.ts";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

let camera, rawScene, renderer, control;


onMounted(() => {
    init();
    render();
});

function init() {

    const container = document.querySelector('#container');

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 1000);
    camera.position.set(100, 100, 100);
    const camera1 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 1000);
    camera1.position.set(0, 0, 0);

    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    const light2 = new DirectionalLight(0xffffff, 1);
    light2.position.set(0.5, 0, 0.866); // ~60º
    light2.name = "main_light";
    const pointLight = new PointLight(0xffffff, 1);
    let pointLightHelper = new PointLightHelper(pointLight, 5, 0xffff00);
    pointLight.name = "point_light";


    renderer = new THREE.WebGLRenderer({canvas: container, antialias: true})
    renderer.setPixelRatio(window.devicePixelRatio);
    control = new OrbitControls(camera, renderer.domElement);// use if there is no animation loop
    control.minDistance = 2;
    control.maxDistance = 1000;
    control.target.set(0, 0, 0);
    control.update();
    rawScene = new THREE.Scene();


    ThreeJarvis.init(rawScene,camera1, renderer,{control});
    rawScene.add(camera);
    rawScene.add(camera1);
    rawScene.add(pointLight);
    rawScene.add(light);
    rawScene.add(light2);
    let group = new Group();
    group.name = "cube";
    const boxGeometry = new BoxGeometry(10, 10, 10);
    const material = new MeshBasicMaterial({color: 0x00ff00});
    const mesh = new THREE.Mesh(boxGeometry, material);
    mesh.layers.set(0);
    rawScene.add(group);
    setTimeout(() => {
        mesh.name = "12312312";
    }, 5000);
    group.add(mesh);
    mesh.position.set(0, 0, 0);
    // material.wireframe = true;
    const loader = new GLTFLoader().setPath("../../static/");
    window.addEventListener("resize", onWindowResize);
    // renderer.antialias = t
    loader.load("test.glb", function (gltf) {
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
        <div id="three">
            <canvas id="container" height="909" width="1912"></canvas>
        </div>
    </div>
</template>

<style scoped>

</style>
