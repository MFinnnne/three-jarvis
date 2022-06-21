import * as THREE from 'three';
import Constant from './constant/Constant';
import './sass/full.scss';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as allEvents from './core/events';
import state from './core/State';
import GUI from './app/GUI';
import {TransformControls} from "three/examples/jsm/controls/TransformControls";
import objectChanged from "./core/ObjectChanged";

export default class ThreeJarvis {
    public static init(
        scene: THREE.Scene,
        camera: THREE.Camera,
        renderer: THREE.WebGLRenderer,
        container: HTMLElement,
        options?: {
            control?: OrbitControls;
            lazyLoad: false;
        },
    ) {
        Constant.rawVar = {
            scene: scene,
            render: renderer,
            control: options?.control ?? new OrbitControls(camera, renderer.domElement),
            container: container,
            camera: camera,
            transformControls: new TransformControls(camera, renderer.domElement)
        };

        console.log("5");
        GUI.guiContainerInit();
        state.activeCamera = camera;
        // register events
        for (const allEventsKey in allEvents) {
            allEvents[allEventsKey]();
        }
    }
}
