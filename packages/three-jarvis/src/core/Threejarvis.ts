import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Creator from './Creator';
import Monitor from './Monitor';
import '../sass/full.scss';
import {Config} from "../config/Config";
import ThreeJarvisContext from "./context/ThreeJarvisContext";

export default class ThreeJarvis {
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
		ThreeJarvisContext.setContext(renderer.domElement.id, monitor)
		monitor.start(scene, renderer, camera, options);

	}

	public static creator(container: HTMLCanvasElement): Creator {
		if (container.id === undefined) {
			throw new Error('container id  must be set and only');
		}
		if (ThreeJarvisContext.hasContext(container.id)) {
			throw new Error(`this container(id:${container.id}) has been already used`);
		}
		const creator = new Creator(container);
		ThreeJarvisContext.setContext(container.id, creator)
		return creator;
	}


	//get config
	public static get config(): Config {
		return ThreeJarvis._config;
	}
}
