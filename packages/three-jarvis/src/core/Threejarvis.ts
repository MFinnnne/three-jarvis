import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Creator from './Creator';
import Monitor from './Monitor';
import '../sass/full.scss';
import {Config} from "../config/Config";

export default class ThreeJarvis {
	private static CONTAINER_ID_SET: Set<string> = new Set<string>();
	private static _config: Config = new Config();

	public static clock = new THREE.Clock();

	public static monitor(
		scene: THREE.Scene,
		camera: THREE.PerspectiveCamera,
		renderer: THREE.WebGLRenderer,
		options?: {
			control?: OrbitControls;
		},
	) {
		const monitor = new Monitor();
		monitor.start(scene, renderer, camera, options);
	}

	public static creator(container: HTMLCanvasElement): Creator {
		if (container.id === undefined) {
			throw new Error('container id  must be set and only');
		}
		if (ThreeJarvis.CONTAINER_ID_SET.has(container.id)) {
			throw new Error(`this container(id:${container.id}) has been already used`);
		}
		return new Creator(container);
	}


	//get config
	public static get config(): Config {
		return ThreeJarvis._config;
	}
}
