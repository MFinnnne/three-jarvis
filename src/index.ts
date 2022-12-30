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
import Recover from "./core/Recover";

export default class ThreeJarvis {
    public static init(
        scene: THREE.Scene,
        camera: THREE.Camera,
        renderer: THREE.WebGLRenderer,
        options?: {
            control?: OrbitControls;
        }
    ) {
        Constant.rawVar = {
            scene: scene,
            render: renderer,
            camera: camera,
            control: options?.control ?? new OrbitControls(camera, renderer.domElement)
        };
        TransformControlComponent.init(camera, renderer.domElement);
        GUI.guiContainerInit();
        state.activeCamera = camera;
        // register events
        for (const allEventsKey in allEvents) {
            allEvents[allEventsKey]();
        }
        new MonitorControlPane().genPane();
        Recover.start();
    }
}
