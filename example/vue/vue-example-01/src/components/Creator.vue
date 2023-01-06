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

onMounted(() => {
    const container = document.querySelector('#container');
    ThreeJarvis.create(container, '../../static/CONFIG.json');
});

</script>

<style scoped>

</style>
