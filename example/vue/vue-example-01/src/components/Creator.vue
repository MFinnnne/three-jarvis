<template>
    <div><div id='three'>
            <canvas id='container' height='909' width='1912'></canvas>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';
import { ThreeJarvis } from '../../../../../src/index.ts';

onMounted(async () => {
    const container = document.querySelector<HTMLCanvasElement>('#container');
    ThreeJarvis.creator(container)
        .subscribeByUUID('315f511e-0080-46dc-8df0-6585c3619cb8')
        .on((observer) => {
            observer.afterAdd = (object, renderer, scene, camera) => {
                console.log('after add', object);
            };
            observer.beforeAdd = (object, renderer, scene, camera) => {
                console.log('before add');
            };
        })
        .create().then();
});

</script>

<style scoped>

</style>
