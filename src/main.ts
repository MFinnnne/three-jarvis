import * as THREE from 'three';
import Constant from './constant/Constant';
import GUI from './app/GUI';
import './sass/full.scss';

export default class ThreeHelper {
    public static init(scene: THREE.Scene, camera: THREE.Camera) {
        console.log('three-helper v1.0.2');
        Constant.SCENE = scene;
        Constant.CAMERA = camera;
        GUI.init();
    }
}
