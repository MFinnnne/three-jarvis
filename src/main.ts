import * as THREE from 'three';
import Constant from './constant/Constant';
import GUI from './app/GUI';

export default class ThreeHelper {
    public static init(scene: THREE.Scene, camera: THREE.Camera) {
        Constant.SCENE = scene;
        Constant.CAMERA = camera;
        const element = document.createElement('div');
        element.id = 'three-helper-container';
        element.style.position = 'absolute';
        element.style.top = '5%';
        element.style.left = '0px';
        element.style.width = '300px';
        element.style.height = '30%';
        element.style.background = '#fff';
        element.style.overflow = 'auto';
        document.body.appendChild(element);
        Constant.CONTAINER = element;
        GUI.init();
    }
}
