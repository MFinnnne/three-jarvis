import * as THREE from 'three';
import Constant from './constant/Constant';
import GUI from './app/GUI';
import './sass/full.scss';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as allEvents from './core/events';

export default class ThreeHelper {
    public static init(
        scene: THREE.Scene,
        camera: THREE.Camera,
        renderer: THREE.WebGLRenderer,
        control?: OrbitControls,
    ): void {
        console.log('12312312');
        Constant.SCENE = scene;
        Constant.CAMERA = camera;
        Constant.RENDERER = renderer;
        GUI.init();
        /**
         * register events
         */
        for (let allEventsKey in allEvents) {
            allEvents[allEventsKey]();
        }
    }


}
