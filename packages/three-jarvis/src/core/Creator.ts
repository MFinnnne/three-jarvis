import {Clock, FileLoader, GridHelper, Object3D, ObjectLoader, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import GUI from '../app/GUI';
import MonitorControlPane from '../app/pane/MonitorControlPane';
import General from './General';
import ObjectObserver from './ObjectObserver';
import sceneDB, {SceneEntity} from './mapper/SceneDB';

type JarvisHook = {
	afterRender?: () => void;
	beforeRender?: () => void;
	dataGet?: () => string;
	dataStore?: (content: string) => void;
};

type CustomPersistence = {
	onSave: (json: String) => void;
	onDelete: (obj: Object3D) => void;
	onUpdate: (json: String) => void;
	onLoad: () => String;
};

export default class Creator extends General {
	private _uuidSubMap: Map<string, ObjectObserver[]> = new Map();
	private clock = new Clock();
	private pane!: MonitorControlPane;

	constructor(container: HTMLCanvasElement) {
		super();
		this._container = container;
	}

	public async createFrom(from: string | (() => string | ArrayBuffer)) {
		let creator: Creator;
		const loader = new FileLoader();
		if (typeof from === 'string') {
			loader.loadAsync(from).then(async (res) => {
				let rawString: string;
				if (typeof res !== 'string') {
					rawString = new TextDecoder().decode(res);
				} else {
					rawString = res;
				}
				const se = JSON.parse(rawString) as SceneEntity;
				creator = new Creator(this.container);
				await creator.create(se);
			});
		} else {
			const data = from();
			if (typeof data === 'string') {
				if (data) {
					console.warn("this json has already exist in indexed db,we will select indexedDB's json");
				} else {
					const parse = JSON.parse(data) as SceneEntity;
					sceneDB.addJson(parse);
				}
			}
			creator = new Creator(this.container);
			await creator.create()
		}
	}

	async create(se?: SceneEntity) {
		this._renderer = new WebGLRenderer({canvas: this.container});
		this._renderer.setPixelRatio(window.devicePixelRatio);

		this._recorder.afterExecute.push(() => this.toJson());
		const sceneInfo = se ?? (await sceneDB.get(this.container.id));
		if (sceneInfo) {
			await this.fromJson(sceneInfo);
		} else {
			this._scene = new Scene();
			this._camera = new PerspectiveCamera();
			this.camera.lookAt(0, 0, 0);
			this.camera.name = 'jarvis-camera';
			this.camera.layers.enableAll();
			this.camera.position.set(8, 8, 8);
			this.scene.add(this.camera);
			this.state.activeCamera = this.camera;
			this.scene.add(this.light);
		}
		this.init();
		this.render();

		window.addEventListener('resize', () => {
			this.onWindowResize();
		});
	}

	private init() {
		this._control = new OrbitControls(this.camera, this.renderer.domElement);
		this.control.minDistance = 2;
		this.control.maxDistance = 1000;
		this.control.update();
		this.control.addEventListener('end', () => {
			this._orbitControlIsWorking = false;
		});
		this.control.addEventListener('start', () => {
			this._orbitControlIsWorking = true;
		});
		this.initTransformControl();
		this.scene.add(this.transformControl);
		const gridHelper = new GridHelper(20, 20);
		gridHelper.userData.isShow = false;
		gridHelper.layers.set(3);
		gridHelper.name = 'jarvis-grid-helper';
		this.scene.add(gridHelper);
		GUI.guiContainerInit(this);
		this.pane = new MonitorControlPane(this);
		this.pane.genPane();
		this.onWindowResize();
	}

	private onWindowResize() {
		if (this.camera instanceof PerspectiveCamera) {
			this.camera.aspect = this.container?.offsetWidth / this.container?.offsetHeight;
		}
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	private render() {
		requestAnimationFrame(this.render.bind(this));
		const delta = this.clock.getDelta();
		this.fps = 1 / delta;
		this.renderer.render(this.scene, this.state.activeCamera);
	}

	public toJson() {
		sceneDB.lazyUpsertScene(this);
	}

	public subscribeByUUID(uuid: string): { on: (resolve: (observer: ObjectObserver) => void) => Creator } {
		const observer = new ObjectObserver('uuid', uuid);
		if (this._uuidSubMap.has(uuid)) {
			this._uuidSubMap.get(uuid)?.push(observer);
		} else {
			this._uuidSubMap.set(uuid, [observer]);
		}
		return {
			on: (resolve: (observer: ObjectObserver) => void) => {
				resolve(observer);
				return this;
			},
		};
	}

	public customPersistence(config: CustomPersistence): Creator {
		this.onSave = config.onSave;
		this.onDelete = config.onDelete;
		this.onLoad = config.onLoad;
		this.onUpdate = config.onUpdate;
		return this;
	}

	async fromJson(json: SceneEntity) {
		const loader = new ObjectLoader();
		this._camera = await loader.parseAsync(json.camera);
		this.state.activeCamera = this.camera;
		const scene = await loader.parseAsync(json.scene);
		scene.traverse((child) => {
			if (child.userData.isShow === false) {
				child.removeFromParent();
			}
		});
		this.setScene(scene as Scene);
	}

	private setScene(scene: Scene) {
		this._scene = scene;
		this.scene.uuid = scene.uuid;
		this.scene.name = scene.name;

		this.scene.background = scene.background;
		this.scene.environment = scene.environment;
		this.scene.fog = scene.fog;

		this.scene.userData = JSON.parse(JSON.stringify(scene.userData));
		for (const child of scene.children) {
			this.beforeAdd(child);
			this.setRenderHook(child);
			this.scene.add(child);
			this.afterAdd(child);
		}

		// 防止比例错误
		this.onWindowResize();
	}

	private afterAdd(child: Object3D) {
		if (this._uuidSubMap.has(child.uuid)) {
			const observers = this._uuidSubMap.get(child.uuid);
			if (observers) {
				for (const observer of observers) {
					observer.afterAdd(child, this.renderer, this.scene, this.camera);
				}
			}
		}
	}

	private beforeAdd(child: Object3D) {
		if (this._uuidSubMap.has(child.uuid)) {
			const observers = this._uuidSubMap.get(child.uuid);
			if (observers) {
				for (const observer of observers) {
					observer.beforeAdd(child, this.renderer, this.scene, this.camera);
				}
			}
		}
	}

	private setRenderHook(child: Object3D) {
		if (this._uuidSubMap.has(child.uuid)) {
			const observers = this._uuidSubMap.get(child.uuid);
			if (observers) {
				child.onBeforeRender = (renderer, scene, camera, ) => {
					for (const observer of observers) {
						observer.beforeRender(child, renderer, scene, camera);
					}
				};
				child.onAfterRender = (renderer, scene, camera) => {
					for (const observer of observers) {
						observer.afterRender(child, renderer, scene, camera);
					}
				};
			}
		}
	}
}
