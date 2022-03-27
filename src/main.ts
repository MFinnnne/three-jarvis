import * as THREE from 'three';
import Constant from './constant/Constant';
import GUI from './app/GUI';

export default class ThreeHelper {
    public static init(scene: THREE.Scene, camera: THREE.Camera) {
        Constant.SCENE = scene;
        Constant.CAMERA = camera;

        GUI.init();
    }
}
