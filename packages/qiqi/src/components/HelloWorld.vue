<script setup lang="ts">
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {onMounted} from 'vue';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {ThreeJarvis} from 'three-jarvis';

let camera, scene, renderer;

onMounted(() => {
	init();
	render();
});

function init() {
	const canvas = document.querySelector('#three') as HTMLCanvasElement;
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 20);
	camera.position.set(10, 5, 10);

	scene = new THREE.Scene();
	const dirLight = new THREE.DirectionalLight(0xffffff);
	dirLight.position.set(0, 1, 0);
	scene.add(dirLight);
	const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
	hemiLight.position.set(0, 1, 0);
	scene.add(hemiLight);
	const loader = new GLTFLoader().setPath('../../static/');
	loader.load('qiqi.gltf', function (gltf) {
		// gltf.scene.scale.set(0.01, 0.01, 0.01);
		scene.add(gltf.scene);

		render();
	});

	renderer = new THREE.WebGLRenderer({canvas, antialias: true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1;
	renderer.setSize(window.innerWidth, window.innerHeight);
	const control = new OrbitControls(camera, renderer.domElement);
	control.addEventListener('change', render); // use if there is no animation loop
	control.minDistance = 2;
	control.maxDistance = 10;
	control.zoom0 = 0.5;
	control.target.set(0, 0, -0.2);
	control.update();

	ThreeJarvis.monitor(scene, camera, renderer);
	window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

	render();
}

//

function render() {
	renderer.render(scene, camera);
}
</script>

<template>
	<div class="container">
		<canvas id="three"></canvas>
	</div>
</template>

<style scoped>
.container {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
}
</style>
