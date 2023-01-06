import * as THREE from "three";
import "./sass/full.scss";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import TransformControlComponent from "./core/component/TransformControlComponent";
import Jarvis from "./core/Jarvis";
import Toast from "./app/Toast";
import sceneDB from "./core/mapper/SceneDB";

type JarvisHook = {
    afterRender: () => void,
    beforeRender: () => void,
};

export default class ThreeJarvis {
    public static monitor(
        scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        renderer: THREE.WebGLRenderer,
        options?: {
            control?: OrbitControls;
        }
    ) {
        const creator = new Jarvis();
        creator.monitor(scene, renderer, camera, { control: options?.control ?? new OrbitControls(camera, renderer.domElement) });
    }

    public static async create(container: HTMLCanvasElement, url?: string, options?: JarvisHook) {
        if (container.id === undefined) {
            Toast.show("container id  must be set and only");
            return;
        }
        const creator = new Jarvis();
        await creator.creator(container);
    }
}
