<script setup lang="ts">
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as TWEEN from '@tweenjs/tween.js';
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';

let camera, scene, renderer, control, model: THREE.Object3D;

const centerDialogVisible = ref(false);
const picUrl = ref('');
const router = useRouter();
onMounted(() => {
	init();
	render();
});

function init() {
	const canvas = document.querySelector('#three') as HTMLCanvasElement;
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 20);
	camera.position.set(10, 5, 10);
	scene = new THREE.Scene();
	scene.add(camera);

	const dirLight = new THREE.DirectionalLight(0xffffff);
	dirLight.position.set(0, 1, 0);
	scene.add(dirLight);
	const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
	hemiLight.position.set(0, 1, 0);
	scene.add(hemiLight);
	const loader = new GLTFLoader().setPath('/');
	loader.load('qiqi.gltf', function (gltf) {
		// gltf.scene.scale.set(0.01, 0.01, 0.01);
		scene.add(gltf.scene);
		model = gltf.scene;
		render();
	});

	renderer = new THREE.WebGLRenderer({canvas, antialias: true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1;
	renderer.setSize(window.innerWidth, window.innerHeight);
	control = new OrbitControls(camera, renderer.domElement);
	control.minDistance = 2;
	control.maxDistance = 10;
	control.zoom0 = 0.5;
	control.target.set(0, 0, -0.2);
	control.update();

	window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	control.update();
	TWEEN.update();
}

function front() {
	control.reset();
	new TWEEN.Tween({pos: model.position, rot: model.rotation})
		.to({pos: {x: 3.3, y: 0.7, z: 3.4}, rot: {x: 0, y: 2.4, z: 0}}, 1000)
		.onUpdate((obj: any) => {
			model.position.set(obj.pos.x, obj.pos.y, obj.pos.z);
			model.rotation.set(obj.rot.x, obj.rot.y, obj.rot.z);
		})
		.easing(TWEEN.Easing.Quadratic.Out)
		.start();
}

function back() {
	control.reset();

	new TWEEN.Tween({pos: model.position, rot: model.rotation})
		.to({pos: {x: 3.3, y: 0.7, z: 3.4}, rot: {x: 0, y: -0.7, z: 0}}, 1000)
		.onUpdate((obj: any) => {
			model.position.set(obj.pos.x, obj.pos.y, obj.pos.z);
			model.rotation.set(obj.rot.x, obj.rot.y, obj.rot.z);
		})
		.easing(TWEEN.Easing.Quadratic.Out)
		.start();
}

function vertical() {
	control.reset();

	new TWEEN.Tween({pos: model.position, rot: model.rotation})
		.to({pos: {x: 2.9, y: 1.4, z: 2.9}, rot: {x: 0, y: 2.4, z: 1.2}}, 1000)
		.onUpdate((obj: any) => {
			model.position.set(obj.pos.x, obj.pos.y, obj.pos.z);
			model.rotation.set(obj.rot.x, obj.rot.y, obj.rot.z);
		})
		.easing(TWEEN.Easing.Quadratic.Out)
		.start();
}

function leftUp() {
	control.reset();

	new TWEEN.Tween({pos: model.position, rot: model.rotation})
		.to({pos: {x: 2.5, y: 1.0, z: 3.3}, rot: {x: 1.1, y: 0.5, z: -0.8}}, 1000)
		.onUpdate((obj: any) => {
			model.position.set(obj.pos.x, obj.pos.y, obj.pos.z);
			model.rotation.set(obj.rot.x, obj.rot.y, obj.rot.z);
		})
		.easing(TWEEN.Easing.Quadratic.Out)
		.start();
}

function right() {
	control.reset();
	new TWEEN.Tween({pos: model.position, rot: model.rotation})
		.to({pos: {x: 3.1, y: 1.1, z: 3.6}, rot: {x: 1.1, y: 3.6, z: 0.8}}, 1000)
		.onUpdate((obj: any) => {
			model.position.set(obj.pos.x, obj.pos.y, obj.pos.z);
			model.rotation.set(obj.rot.x, obj.rot.y, obj.rot.z);
		})
		.easing(TWEEN.Easing.Quadratic.Out)
		.start();
}

function up() {
	control.reset();
	new TWEEN.Tween({pos: model.position, rot: model.rotation})
		.to({pos: {x: 3.3, y: 1.7, z: 3.4}, rot: {x: 0, y: 2.4, z: -1.8}}, 1000)
		.onUpdate((obj: any) => {
			model.position.set(obj.pos.x, obj.pos.y, obj.pos.z);
			model.rotation.set(obj.rot.x, obj.rot.y, obj.rot.z);
		})
		.easing(TWEEN.Easing.Quadratic.Out)
		.start();
}

function showDetail(url: string, e: Event) {
	picUrl.value = url;
	centerDialogVisible.value = true;
}
</script>

<template>
	<div class="container">
		<canvas id="three"></canvas>
	</div>
	<div class="over">
		<el-row class="mb-4">
			<el-button class="item" type="primary" v-on:click="front">正视图</el-button>
			<el-button class="item" type="primary" @click="vertical">俯视图</el-button>
			<el-button class="item" type="primary" @click="leftUp">左上视图</el-button>
			<el-button class="item" type="primary" @click="right">右上视图</el-button>
			<el-button class="item" type="primary" @click="up">仰视图</el-button>
			<el-button class="item" type="primary" @click="back">后视图</el-button>
		</el-row>
	</div>
	<div class="pic">
		<el-image
			class="item"
			src="/back.png"
			fit="fill"
			@click="
				(e) => {
					showDetail('/back.png', e);
				}
			"
		></el-image>
		<el-image
			class="item"
			src="/front.png"
			fit="fill"
			@click="
				(e) => {
					showDetail('/front.png', e);
				}
			"
		></el-image>
		<el-image
			class="item"
			src="/left.png"
			fit="fill"
			@click="
				(e) => {
					showDetail('/left.png', e);
				}
			"
		></el-image>
		<el-image
			class="item"
			src="/up.png"
			fit="fill"
			@click="
				(e) => {
					showDetail('/up.png', e);
				}
			"
		></el-image>
	</div>
	<el-dialog v-model="centerDialogVisible" title="大图" width="60%" center>
		<el-image :src="picUrl" fit="contain"></el-image>
	</el-dialog>
	<div class="back">
		<el-button type="primary" @click="router.back()">返回主页</el-button>
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

.back {
	position: absolute;
	top: 0%;
	left: 0%;
	width: 10%;
	height: 10%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

.over {
	position: absolute;
	top: 90%;
	left: 0%;
	width: 100%;
	height: 10%;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	flex-direction: row;
	align-items: center;
}

.over .item {
	margin-right: 5px;
	margin-left: 5px;
	margin-top: 5px;
}

.pic {
	position: absolute;
	top: 0%;
	right: 0%;
	width: 15%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	overflow-y: scroll;
}
.pic .item {
	margin-bottom: 5px;
	margin-right: 10px;
	cursor: pointer;
}
</style>
