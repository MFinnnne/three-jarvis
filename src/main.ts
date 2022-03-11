import * as THREE from "three";
import ThreeParams from "./constant/ThreeParams";

export default class ThreeHelper {
    constructor(scene: THREE.Scene, camera: THREE.Camera) {
        ThreeParams.SCENE = scene;
        ThreeParams.CAMERA = camera;
        const divElement = document.createElement('div');
        divElement.innerHTML = `<p>fuck</p>`
        document.body.append(divElement)
        console.log("hello");
    }
}

