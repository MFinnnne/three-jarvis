import * as THREE from 'three';
import { Scene } from 'three';
import Constant from './constant/Constant';
import GUI from './app/GUI';
import './sass/full.scss';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as allEvents from './core/events';
import CameraControls from 'camera-controls';
import state from './core/State';
import monitorObject from './core/MonitorObject';

CameraControls.install({ THREE: THREE });

export default class ThreeHelper {
    public static init(
        scene: THREE.Scene,
        camera: THREE.Camera,
        renderer: THREE.WebGLRenderer,
        container: HTMLElement,
        control: OrbitControls,
    ): Scene {
        console.log('mfine14');
        Constant.SCENE = scene;
        Constant.CAMERA = camera;
        Constant.RENDERER = renderer;
        Constant.THREE_CONTAINER = container;
        Constant.CONTROL = control;
        monitorObject.warpScene(scene);
        GUI.init();
        state.activeCamera = camera;
        // register events
        for (const allEventsKey in allEvents) {
            allEvents[allEventsKey]();
        }
        return monitorObject.warpScene(scene);
    }
}
