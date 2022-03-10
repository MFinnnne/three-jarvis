import * as THREE from "three";
import ThreeVar from "./constant/ThreeVar";


export default class ThreeHelper {
    constructor(scene: THREE.Scene, camera: THREE.Camera) {
        ThreeVar.SCENE = scene;
        ThreeVar.CAMERA = camera;
    }
}

