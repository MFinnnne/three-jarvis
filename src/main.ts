import * as THREE from 'three';
import Constant from './constant/Constant';
import GUI from './app/GUI';
import './sass/full.scss';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as allEvents from './core/events';
import CameraControls from 'camera-controls';
import state from './core/State';
import monitorObject from './core/MonitorObject';
import {ProxyThreeVar} from "./types/types";

CameraControls.install({THREE: THREE});

export default class ThreeHelper {
    public static init(
        scene: THREE.Scene,
        camera: THREE.Camera,
        renderer: THREE.WebGLRenderer,
        container: HTMLElement,
        control: OrbitControls,
    ): ProxyThreeVar {
        console.log('mfine16');
        Constant.rawVar = {scene: scene, render: renderer, control: control, container: container, camera: camera}
        const monitorScene = monitorObject.monitorScene(scene);
        const monitorRender = monitorObject.monitorRender(renderer);
        Constant.proxyVar = {scene: monitorScene, render: monitorRender}
        GUI.init();
        state.activeCamera = camera;

        // register events
        for (const allEventsKey in allEvents) {
            allEvents[allEventsKey]();
        }
        return Constant.proxyVar;
    }
}
