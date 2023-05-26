<template>
	<div>
		<div id="three">
			<canvas id="container" height="909" width="1912"></canvas>
		</div>
	</div>
</template>

<script setup lang="ts">
import {Object3D} from 'three';
import {ThreeJarvis} from 'three-jarvis';
import {onMounted} from 'vue';

onMounted(async () => {
	const container = document.querySelector<HTMLCanvasElement>('#container');
	if (!container) {
		console.error('canvas container is not found');
		return;
	}

	ThreeJarvis.creator(container)
		.customPersistence({
			onDelete: (json: Object3D) => {
				console.log('delete');
			},
			onLoad: () => {
				return 'load';
			},
			onUpdate: (json: String) => {
				console.log('onUpdate');
			},

			onSave: (json: String) => {
				console.log('onSave');
			},
		})
		.subscribeByUUID('315f511e-0080-46dc-8df0-6585c3619cb8')
		.on((observer) => {
			observer.afterAdd = (object, _renderer, _scene, _camera) => {
				console.log('after add', object);
			};
			observer.beforeAdd = (_object, _renderer, _scene, _camera) => {
				console.log('before add');
			};
		})
		.create()
		.then();
});
</script>

<style scoped></style>
