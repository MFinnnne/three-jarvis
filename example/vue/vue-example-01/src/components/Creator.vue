<template>
    <div>
        <div id="three">
            <canvas id="container" height="909" width="1912"></canvas>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import ThreeJarvis from "../../../../../src/index.ts";
import {Mesh, Object3D} from "three";

onMounted(async () => {
    const container = document.querySelector('#container');
    let threeJarvis = new ThreeJarvis(container);
    threeJarvis.create();
    const res = await ThreeJarvis.create('../../static/CONFIG.json');
    const sub = res.subscribe('fdceba65-9019-4033-bf20-8e09c8bf00de');
    sub.afterAdd = (object: Mesh) => {
        console.log(object);
    }
});

</script>

<style scoped>

</style>
