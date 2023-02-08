import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Monitor from './core/Monitor';
import Creator from './core/Creator';
import './sass/full.scss';

export default class ThreeJarvis {
    private static CONTAINER_ID_SET: Set<string> = new Set<string>();

    public static monitor(
        scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        renderer: THREE.WebGLRenderer,
        options?: {
            control?: OrbitControls;
        },
    ) {
        const monitor = new Monitor();
        monitor.start(scene, renderer, camera, {
            control: options?.control ?? new OrbitControls(camera, renderer.domElement),
        });
    }


    public static creator(container: HTMLCanvasElement): Creator {
        if (container.id === undefined) {
            // Toast.show('container id  must be set and only');
            throw new Error('container id  must be set and only');
        }
        if (ThreeJarvis.CONTAINER_ID_SET.has(container.id)) {
            throw new Error(`this container(id:${container.id}) has been already used`);
        }
        return new Creator(container);
    }
}
