import * as THREE from "three";
import { PerspectiveCamera } from "three";
import Constant from "./constant/Constant";
import "./sass/full.scss";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as allEvents from "./core/events";
import state from "./core/State";
import GUI from "./app/GUI";
import TransformControlComponent from "./core/component/TransformControlComponent";
import MonitorControlPane from "./app/pane/MonitorControlPane";

export default class ThreeJarvis {
    public static init(
        scene: THREE.Scene,
        renderer: THREE.WebGLRenderer,
        options?: {
            control?: OrbitControls;
        }
    ) {
        const jarvisCamera = new PerspectiveCamera(45, renderer.domElement.clientWidth / renderer.domElement.clientHeight, 0.25, 1000);
        jarvisCamera.position.set(100, 100, 100);
        jarvisCamera.name="jarvis camera"
        scene.add(jarvisCamera);
        Constant.rawVar = {
            scene: scene,
            render: renderer,
            camera: jarvisCamera,
            control: options?.control ?? new OrbitControls(jarvisCamera, renderer.domElement),
        };
        TransformControlComponent.init(jarvisCamera, renderer.domElement)
        GUI.guiContainerInit();
        state.activeCamera = jarvisCamera;
        // register events
        for (const allEventsKey in allEvents) {
            allEvents[allEventsKey]();
        }
        new MonitorControlPane().genPane();
        // Recover.start();
    }
}
