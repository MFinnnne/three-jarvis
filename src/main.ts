import * as THREE from 'three';
import Constant from './constant/Constant';
import GUI from './app/GUI';
import './sass/full.scss';
import EventRegistry from './core/EventRegistry';

export default class ThreeHelper {
    public static init(scene: THREE.Scene, camera: THREE.Camera) {
        console.log(new Date().toLocaleString());
        Constant.SCENE = scene;
        Constant.CAMERA = camera;
        GUI.init();
        EventRegistry.registry();
    }
}
