import * as THREE from 'three';
import {FileLoader} from 'three';
import './sass/full.scss';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Jarvis from './core/Jarvis';
import Toast from './app/Toast';
import sceneDB, {SceneEntity} from './core/mapper/SceneDB';
import ObjectEventBus from "./core/ObjectEventBus";
import {call} from "toastify-js";
import {f} from "million/dist/types-9663cfda";

type JarvisHook = {
    afterRender?: () => void;
    beforeRender?: () => void;
    dataGet?: () => string;
    dataStore?: (content: string) => void;
};

export default class ThreeJarvis {

    private container: HTMLCanvasElement;

    private objectEvents: ObjectEventBus[] = []

    private jarvis: Jarvis;

    constructor(container: HTMLCanvasElement) {
        if (container.id === undefined) {
            Toast.show('container id  must be set and only');
            throw new Error();
        }
        this.container = container;
    }

    public monitor(
        scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        renderer: THREE.WebGLRenderer,
        options?: {
            control?: OrbitControls;
        },
    ) {
        const creator = new Jarvis(this.objectEvents);
        creator.monitor(scene, renderer, camera, {
            control: options?.control ?? new OrbitControls(camera, renderer.domElement),
        });
    }

    public create(hook?: JarvisHook) {
        this.jarvis = new Jarvis(this.objectEvents);
        this.jarvis.creator(this.container).then(r => {
        });
    }

    public createFrom(from: string | (() => string | ArrayBuffer), options?: JarvisHook) {
        let creator: Jarvis;
        const loader = new FileLoader();
        if (typeof from === 'string') {
            loader.loadAsync(from).then(res => {
                let rawString: string;
                if (typeof res !== 'string') {
                    rawString = new TextDecoder().decode(res);
                } else {
                    rawString = res;
                }
                const se = JSON.parse(rawString) as SceneEntity;
                creator = new Jarvis(this.objectEvents);
                creator.creator(this.container, se).then(r => {
                });
            });
        } else {
            const data = from();
            if (typeof data === 'string') {
                const exist = data;
                if (exist) {
                    console.warn("this json has already exist in indexed db,we will select indexedDB's json");

                } else {
                    const parse = JSON.parse(data) as SceneEntity;
                    sceneDB.addJson(parse);
                }
            }
            creator = new Jarvis(this.objectEvents);
            creator.creator(this.container).then(r => {
            });
        }
    }

    public subscribeByUUID(uuid: string): ObjectEventBus {
        const objectEventDispatch = new ObjectEventBus('uuid', uuid);
        return objectEventDispatch;
    }

}



