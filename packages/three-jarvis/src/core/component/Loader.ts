import {LoaderUtils} from "../../util/LoadUtils";
import * as THREE from "three";
import {LoadingManager, Object3D} from "three";
import {TGALoader} from "three/examples/jsm/loaders/TGALoader";
import PromiseFileReader from "../../util/PromiseFileReader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {MeshoptDecoder} from "three/examples/jsm/libs/meshopt_decoder.module";


export class Loader {
	private _jarvis = null;

	private _gltfLoader: GLTFLoader;
	private readonly _manager: LoadingManager;

	constructor(jarvis: any) {
		this._jarvis = jarvis;
		this._manager = new THREE.LoadingManager();
		this._gltfLoader = this.setGLTFLoader(this._manager);
	}

	set jarvis(value: any) {
		this._jarvis = value;
	}


	get jarvis(): any {
		return this._jarvis;
	}

	public load(target: Event | string | string[]): Promise<null | Object3D[] | Object3D> {
		if (target instanceof Event) {
			return this.importModel(target);
		} else if (typeof target === 'string') {
			const names = target.split('.');
			if (names.length > 1) {
				const type = names.pop()?.toLowerCase();
				switch (type) {
					case 'gltf':
					case 'glb':
						return this.loadGLxMode(target, names.join('.'));
				}
			}
		} else {
			for (let path of target) {
				const names = path.split('.');
				if (names.length > 1) {
					const type = names.pop()?.toLowerCase();
					switch (type) {
						case 'gltf':
						case 'glb':
							return this.loadGLxMode(path, names.join('.'));
					}
				}
			}
		}
		return Promise.reject("not support file type");
	}

	public importModel(e): Promise<Object3D[]> {
		const loadPromise: Promise<Object3D | null>[] = [];
		const files = (e.target as any).files;
		if (files.length > 0) {
			const filesMap = LoaderUtils.createFilesMap(files);
			this._manager.setURLModifier((url) => {
				url = url.replace(/^(\.?\/)/, '');
				const file = filesMap[url];
				if (file) {
					console.log('Loading', url);
					return URL.createObjectURL(file);
				}
				return url;
			});
			this._manager.addHandler(/\.tga$/i, new TGALoader());
			for (let i = 0; i < files.length; i++) {
				const promise = PromiseFileReader.readAsArrayBuffer(files[i]).then((event) => {
					const extension = files[i].name.split('.').pop().toLowerCase();
					const filename = files[i].name;
					console.log(`file type:${extension}`);
					switch (extension) {
						case 'glb': {
							return this.loadGLB(event, filename);
						}
						case 'gltf': {
							return this.loadGlLTF(event, filename);
						}
						default:
							return null;
					}
				});
				loadPromise.push(promise);
			}
		}
		return Promise.all(loadPromise) as Promise<Object3D[]>;
	}

	private loadGLB(target: ArrayBuffer | string, filename): Promise<Object3D> {
		this._gltfLoader.setMeshoptDecoder(MeshoptDecoder);
		return this.loadGLxMode(target, filename);
	}


	private loadGlLTF(target: ArrayBuffer | string, filename?): Promise<Object3D> {
		if (this.isGLTF1(target)) {
			alert(
				'Import of glTF asset not possible. Only versions >= 2.0 are supported. Please try to upgrade the file to glTF 2.0 using glTF-Pipeline.',
			);
		}
		return this.loadGLxMode(target, filename);
	}

	private loadGLxMode(target: ArrayBuffer | string, filename): Promise<Object3D> {
		if (typeof target === 'string') {
			return new Promise(
				resolve => {
					this._gltfLoader.load(target, (result) => {
						const scene = result.scene;
						scene.name = filename ?? scene.name ?? scene.type;
						scene.animations.push(...result.animations);
						return resolve(scene);
					});
				},
			)
		} else {
			return new Promise(
				resolve => {
					this._gltfLoader.parse(target, '', (result) => {
						const scene = result.scene;
						scene.name = filename ?? scene.name ?? scene.type;
						scene.animations.push(...result.animations);
						return resolve(scene);
					});
				}
			)
		}
	}

	private setGLTFLoader(manager: LoadingManager) {
		const loader = new GLTFLoader(manager);
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath('three/examples/js/libs/draco/gltf/');
		loader.setDRACOLoader(dracoLoader);
		return loader;
	}

	private isGLTF1(contents) {
		let resultContent;
		if (typeof contents === 'string') {
			// contents is a JSON string
			resultContent = contents;
		} else {
			const magic = THREE.LoaderUtils.decodeText(new Uint8Array(contents, 0, 4));
			if (magic === 'glTF') {
				// contents is a .glb file; extract the version
				const version = new DataView(contents).getUint32(4, true);
				return version < 2;
			} else {
				// contents is a .gltf file
				resultContent = THREE.LoaderUtils.decodeText(new Uint8Array(contents));
			}
		}
		const json = JSON.parse(resultContent);
		return json.asset != undefined && json.asset.version[0] < 2;
	}

}
