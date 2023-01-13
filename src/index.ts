import * as THREE from 'three';
import {FileLoader} from 'three';
import './sass/full.scss';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Jarvis from './core/Jarvis';
import Toast from './app/Toast';
import sceneDB, {SceneEntity} from './core/mapper/SceneDB';
import ObjectEventDispatch from "./core/ObjectEventDispatch";
import ObjectEventSubscribe from "./core/ObjectEventSubscribe";

type JarvisHook = {
    afterRender?: () => void;
    beforeRender?: () => void;
    dataGet?: () => string;
    dataStore?: (content: string) => void;
};

type JarvisReturn = {
    subscribe?: (uuid: string) => ObjectEventDispatch;
}
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

    public static create(container: HTMLCanvasElement, url?: string, options?: JarvisHook): JarvisReturn {
        if (container.id === undefined) {
            Toast.show('container id  must be set and only');
            throw new Error();
        }
        let creator: Jarvis;
        if (url) {
            const loader = new FileLoader();
            Promise.all([loader.loadAsync(url), sceneDB.countById(container.id)]).then(res => {
                if (typeof res[0] === 'string') {
                    const exist = res[1];
                    if (exist) {
                        console.warn("this json has already exist in indexed db,we will select indexedDB's json");

                    } else {
                        const parse = JSON.parse(res[0]) as SceneEntity;
                        sceneDB.addJson(parse);
                    }
                }
                creator = new Jarvis();
                creator.creator(container).then(r =>{});
            })
        } else {
            creator = new Jarvis();
            creator.creator(container).then(r => {});
        }

        function subscribe(uuid: string):ObjectEventDispatch {
            const obj = creator.scene.getObjectByProperty('uuid', uuid);
            if (obj) {
                return new ObjectEventDispatch(obj);
            }
            throw new Error(`can not find a uuid for ${uuid} object in scene`);
        }

        return {subscribe};
    }

}



