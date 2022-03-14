import * as THREE from "three";
import ThreeParams from "./constant/ThreeParams";
import ObjectTree from "./app/ObjectTree";

export default class ThreeHelper {
    constructor(scene: THREE.Scene, camera: THREE.Camera) {
        ThreeParams.SCENE = scene;
        ThreeParams.CAMERA = camera;

    }
}

