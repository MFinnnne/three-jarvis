import * as THREE from 'three';
import {FileLoader} from 'three';
import './sass/full.scss';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Jarvis from './core/Jarvis';
import Toast from './app/Toast';
import sceneDB, {SceneEntity} from './core/mapper/SceneDB';
import EventDispatch from "./core/EventDispatch";

type JarvisHook = {
    afterRender?: () => void;
    beforeRender?: () => void;
    dataGet?: () => string;
    dataStore?: (content: string) => void;
};
export default class ThreeJarvis {
    public static monitor(
        scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        renderer: THREE.WebGLRenderer,
        options?: {
            control?: OrbitControls;
        },
    ) {
        const creator = new Jarvis();
        creator.monitor(scene, renderer, camera, {
            control: options?.control ?? new OrbitControls(camera, renderer.domElement),
        });
    }

    public static async create(container: HTMLCanvasElement, url?: string, options?: JarvisHook): Promise<EventDispatch> {
        if (container.id === undefined) {
            Toast.show('container id  must be set and only');
            throw new Error();
        }
        let creator: Jarvis;
        if (url) {
            const loader = new FileLoader();

            loader.load(url, async (res) => {
                if (typeof res === 'string') {
                    const exist = await sceneDB.countById(container.id);
                    if (exist) {
                        console.warn("this json has already exist in indexed db,we will select indexedDB's json");

                    } else {
                        const parse = JSON.parse(res) as SceneEntity;
                        sceneDB.addJson(parse);
                    }
                }
                creator = new Jarvis();
                await creator.creator(container);

            });
        } else {
            creator = new Jarvis();
            await creator.creator(container);
        }
        return new EventDispatch(container.id);
    }
}

