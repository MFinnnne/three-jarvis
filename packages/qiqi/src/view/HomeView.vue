<script setup>
import * as THREE from 'three';
import {onMounted, ref} from 'vue';

import * as TWEEN from '@tweenjs/tween.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {FontLoader} from 'three/addons/loaders/FontLoader.js';
import {SVGLoader} from 'three/addons/loaders/SVGLoader.js';
import {useRouter} from 'vue-router';
import {ElNotification, ElMessage, ElMessageBox} from 'element-plus';

const currentDate = ref(new Date().toLocaleDateString());
const router = useRouter();
onMounted(() => {
	init();
	render();
	open();
});

let camera, scene, renderer;

function sittingRoomClick() {
	ElMessageBox.alert('琦琦在挑瓷砖呢 ₍ᐢ.ˬ.⑅ᐢ₎  (=^-ω-^=)', '目前在干啥', {
		confirmButtonText: 'OK',
	});
}

function init() {
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.set(0, 700, 600);

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xf0f0f0);

	const loader = new FontLoader();
	loader.load('/helvetiker_regular.typeface.json', function (font) {
		const color = new THREE.Color(0x006699);

		const matDark = new THREE.MeshBasicMaterial({
			color: color,
			side: THREE.DoubleSide,
		});

		const matLite = new THREE.MeshBasicMaterial({
			color: color,
			transparent: true,
			opacity: 0.4,
			side: THREE.DoubleSide,
		});

		const message = 'Qi^2';

		const shapes = font.generateShapes(message, 100);

		const geometry = new THREE.ShapeGeometry(shapes);

		geometry.computeBoundingBox();

		const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

		geometry.translate(xMid, 0, 0);

		// make shape ( N.B. edge view not visible )

		const text = new THREE.Mesh(geometry, matLite);
		text.position.set(-16.5, 109.9, -250);
		text.rotation.x = -0.8;
		scene.add(text);

		// make line shape ( N.B. edge view remains visible )

		const holeShapes = [];

		for (let i = 0; i < shapes.length; i++) {
			const shape = shapes[i];

			if (shape.holes && shape.holes.length > 0) {
				for (let j = 0; j < shape.holes.length; j++) {
					const hole = shape.holes[j];
					holeShapes.push(hole);
				}
			}
		}

		shapes.push.apply(shapes, holeShapes);

		const style = SVGLoader.getStrokeStyle(5, color.getStyle());

		const strokeText = new THREE.Group();

		for (let i = 0; i < shapes.length; i++) {
			const shape = shapes[i];

			const points = shape.getPoints();

			const geometry = SVGLoader.pointsToStroke(points, style);

			geometry.translate(xMid, 0, 0);

			const strokeMesh = new THREE.Mesh(geometry, matDark);
			strokeText.add(strokeMesh);
		}
		strokeText.position.set(0, 250, 0);
		strokeText.rotation.x = -0.8;
		scene.add(strokeText);
		new TWEEN.Tween(strokeText.rotation)
			.to({y: 2 * Math.PI}, 10000)
			.onUpdate((obj) => {
				strokeText.rotation.y = obj.y;
				text.rotation.y = obj.y;
			})
			.repeat(Infinity)
			.start();
	}); //end load function

	const canvas = document.querySelector('#three-container');
	renderer = new THREE.WebGLRenderer({canvas, antialias: true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	scene.add(camera);
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.target.set(0, 0, 0);
	controls.update();
	controls.addEventListener('change', render);
	window.addEventListener('resize', onWindowResize);
} // end init

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	TWEEN.update();
}

function jump(url) {
	router.push({name: url});
}

const open = () => {
	ElNotification.success({
		title: '欢迎',
		message: '琦琦还会来看看她的妙妙屋吗~？',
		offset: 100,
	});
};

function UnderConstruction(url) {}
</script>

<template>
	<div class="home">
		<div class="preview">
			<div class="item">
				<el-card :body-style="{padding: '0px'}" style="width: 211px">
					<img src="/preview.png" width="211.33" height="197.67" />
					<div style="padding: 14px">
						<span>卫生间</span>
						<div class="bottom">
							<time class="time">{{ currentDate }}</time>
							<el-button
								type="primary"
								class="button"
								@click="
									() => {
										router.push({path: '/bath'});
									}
								"
							>
								施工ing
							</el-button>
						</div>
						<div class="demo-progress">
							<el-progress :text-inside="true" :stroke-width="16" striped striped-flow :percentage="23" />
						</div>
					</div>
				</el-card>
			</div>
			<div class="item">
				<el-card :body-style="{padding: '0px'}">
					<img src="/cat1.png" width="211.33" height="197.67" />
					<div style="padding: 14px">
						<span>客厅</span>
						<div class="bottom">
							<time class="time">{{ currentDate }}</time>
							<el-button type="primary" class="button" @click="sittingRoomClick()">待施工</el-button>
						</div>
						<div class="demo-progress">
							<el-progress :text-inside="true" :stroke-width="20" :percentage="2.33" striped striped-flow status="exception" />
						</div>
					</div>
				</el-card>
			</div>
			<div class="item">
				<el-card :body-style="{padding: '0px'}">
					<img src="/wait.png" width="211.33" height="197.67" />
					<div style="padding: 14px">
						<span>厨房</span>
						<div class="bottom">
							<time class="time">{{ currentDate }}</time>
							<el-button type="info" disabled class="button">待施工</el-button>
						</div>
						<div class="demo-progress">
							<el-progress :text-inside="true" :stroke-width="20" :percentage="0" striped striped-flow status="exception" />
						</div>
					</div>
				</el-card>
			</div>
			<div class="item">
				<el-card :body-style="{padding: '0px'}">
					<img src="/wait.png" width="211.33" height="197.67" />
					<div style="padding: 14px">
						<span>次卧</span>
						<div class="bottom">
							<time class="time">{{ currentDate }}</time>
							<el-button type="info" disabled class="button">待施工</el-button>
						</div>
						<div class="demo-progress">
							<el-progress :text-inside="true" :stroke-width="20" :percentage="0" striped striped-flow status="exception" />
						</div>
					</div>
				</el-card>
			</div>
			<div class="item">
				<el-card :body-style="{padding: '0px'}">
					<img src="/wait.png" width="211.33" height="197.67" />
					<div style="padding: 14px">
						<span>书房</span>
						<div class="bottom">
							<time class="time">{{ currentDate }}</time>
							<el-button type="info" disabled class="button">待施工</el-button>
						</div>
						<div class="demo-progress">
							<el-progress :text-inside="true" :stroke-width="20" :percentage="0" striped striped-flow status="exception" />
						</div>
					</div>
				</el-card>
			</div>
			<div class="item">
				<el-card :body-style="{padding: '0px'}">
					<img src="/cat2.png" width="211.33" height="197.67" />
					<div style="padding: 14px">
						<span>阳台</span>
						<div class="bottom">
							<time class="time">{{ currentDate }}</time>
							<el-button type="info" disabled class="button">待施工</el-button>
						</div>
						<div class="demo-progress">
							<el-progress :text-inside="true" :stroke-width="20" :percentage="0" striped striped-flow status="exception" />
						</div>
					</div>
				</el-card>
			</div>
		</div>
	</div>
	<div class="container">
		<div>
			<canvas id="three-container"></canvas>
		</div>
	</div>
</template>

<style>
body {
	height: 100%;
	width: 100%;
	position: absolute;
	display: block;
}

#app {
	height: 100%;
	width: 100%;
	position: relative;
	display: block;
	margin: 0;
	max-width: 100%;
}

.container {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
}

.home {
	height: 100%;
	width: 100%;
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}

.preview {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	flex-wrap: wrap;
	margin-left: 10px;
	margin-right: 10px;
}

.preview .item {
	margin-right: 10px;
	margin-bottom: 10px;
}

.time {
	font-size: 12px;
	color: #999;
}

.bottom {
	margin-top: 13px;
	line-height: 12px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.button {
	padding: 0;
	min-height: auto;
}

.home {
	z-index: 100;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	flex-wrap: wrap;
	margin-left: 10px;
	margin-right: 10px;
}

.demo-progress {
	margin-top: 10px;
}
</style>
