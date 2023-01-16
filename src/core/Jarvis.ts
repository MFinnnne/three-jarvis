import {
    BoxGeometry,
    Camera,
    GridHelper,
    HemisphereLight,
    Mesh,
    MeshBasicMaterial,
    Object3D,
    ObjectLoader,
    OrthographicCamera,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import GUI from '../app/GUI';
import State from './State';
import MonitorControlPane from '../app/pane/MonitorControlPane';
import TransformControlComponent from './component/TransformControlComponent';
import ObjectChanged from './ObjectChanged';
import {TransformControls} from 'three/examples/jsm/controls/TransformControls';
import PaneManager from './PaneManager';
import {rayCasterEvents} from './events/ObjectEvents';
import sceneDB, {SceneEntity} from './mapper/SceneDB';
import {OBJECT_TREE_BLACK_LIST} from '../config/Config';
import Recorder from './Recorder';
import dayjs from 'dayjs';
import ObjectEventBus from "./ObjectEventBus";

type AfterSceneInitCallBack = () => void;

export default class Jarvis {

    private _camera: PerspectiveCamera | OrthographicCamera = new PerspectiveCamera();
    private _renderer!: WebGLRenderer;

    private _time: string = dayjs().format();
    private _light = new HemisphereLight(0xffffbb, 0x080820, 1);
    private _scene!: Scene;
    private _container!: HTMLCanvasElement;
    private _control!: OrbitControls;
    private _transformControl!: TransformControls;

    private _state!: State;
    private _recorder!: Recorder;
    private _orbitControlIsWorking = false;

    private _orbitControlTimeoutId?: number;
    private _afterSceneInitCallBack: AfterSceneInitCallBack[] = [];
    private readonly _objectEvents: ObjectEventBus[];


    constructor(objectEvents: ObjectEventBus[]) {
        this._objectEvents = objectEvents;
    }

    get recorder(): Recorder {
        return this._recorder;
    }

    get orbitControlIsWorking(): boolean {
        return this._orbitControlIsWorking;
    }

    get time(): string {
        return this._time;
    }

    get afterSceneInitCallBack(): AfterSceneInitCallBack[] {
        return this._afterSceneInitCallBack;
    }

    get transformControl(): TransformControls {
        return this._transformControl;
    }

    get camera(): Camera {
        return this._camera;
    }

    get renderer(): WebGLRenderer {
        return this._renderer;
    }

    get light(): HemisphereLight {
        return this._light;
    }

    get scene(): Scene {
        return this._scene;
    }

    get container(): HTMLCanvasElement {
        return this._container;
    }

    get state(): State {
        return this._state;
    }

    get control(): OrbitControls {
        return this._control;
    }

    monitor(
        scene: Scene,
        renderer: WebGLRenderer,
        camera: PerspectiveCamera,
        option?: {
            control: OrbitControls;
        },
    ) {
        this._scene = scene;
        this._camera = camera;
        this._renderer = renderer;
        this._container = renderer.domElement;
        this._control = option?.control ?? new OrbitControls(camera, renderer.domElement);
        ObjectChanged.getInstance(this);
        const transformControlComponent = new TransformControlComponent(this);
        transformControlComponent.init();
        GUI.guiContainerInit(this);
        this._transformControl = transformControlComponent.control;
        this.state.activeCamera = this._camera;
        new MonitorControlPane(this).genPane();
    }


    async creator(container: HTMLCanvasElement, se?: SceneEntity) {
        this._renderer = new WebGLRenderer({canvas: container});
        this._container = container;
        this._state = new State();
        this._recorder = new Recorder();
        this._recorder.afterExecute.push(() => this.toJson());
        const sceneInfo = se ?? await sceneDB.get(container.id);
        if (sceneInfo) {
            await this.fromJson(sceneInfo);
        } else {
            this._scene = new Scene();
            this._camera = new PerspectiveCamera();
            this._camera.lookAt(0, 0, 0);
            this._camera.name = 'jarvis-camera';
            this._camera.layers.enableAll();
            this._camera.position.set(8, 8, 8);
            this._scene.add(this._camera);
            this.state.activeCamera = this._camera;
            this._scene.add(this._light);
            const boxGeometry = new BoxGeometry(1, 1, 1);
            const material = new MeshBasicMaterial({color: 0x00ff00});
            const mesh = new Mesh(boxGeometry, material);
            mesh.position.set(1, 1, 1);
            this._scene?.add(mesh);
        }
        this.init();
        this.render();
        ObjectChanged.getInstance(this).objectHelper(this.scene);
        window.addEventListener('resize', () => {
            this.onWindowResize();
        });
    }

    private init() {
        this._control = new OrbitControls(this._camera, this._renderer.domElement);
        this._control.minDistance = 2;
        this._control.maxDistance = 1000;
        this._control.update();
        this._control.addEventListener('end', () => {
            this._orbitControlIsWorking = false;
        })
        this._control.addEventListener('start', () => {
            this._orbitControlIsWorking = true;
        })
        const controlComponent = new TransformControlComponent(this);
        controlComponent.init();
        this._transformControl = controlComponent.control;
        this._transformControl.name = 'jarvis-transform-control';
        this._scene.add(this._transformControl);

        const gridHelper = new GridHelper(20, 20);
        gridHelper.layers.set(3);
        gridHelper.name = 'jarvis-grid-helper';
        OBJECT_TREE_BLACK_LIST.push(gridHelper.uuid);

        this._scene.add(gridHelper);
        PaneManager.init(this);
        this.onWindowResize();
        GUI.guiContainerInit(this);
        rayCasterEvents(this);
        new MonitorControlPane(this).genPane();
    }

    private onWindowResize() {
        if (this._camera instanceof PerspectiveCamera) {
            this._camera.aspect = this._container?.offsetWidth / this._container?.offsetHeight;
        }
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private render() {
        requestAnimationFrame(this.render.bind(this));
        this._renderer.render(this._scene, this.state.activeCamera);
        this._control.update();
    }

    public toJson() {
        sceneDB.lazyUpsertScene(this);
    }

    async fromJson(json: SceneEntity) {
        const loader = new ObjectLoader();
        this._camera = await loader.parseAsync(json.camera);
        this.state.activeCamera = this._camera;
        const scene = await loader.parseAsync(json.scene);
        for (const objectEvent of this._objectEvents) {
            const obj = scene.getObjectByProperty(objectEvent.propertyName, objectEvent.propertyValue);
            if (obj) {
                objectEvent.bind(obj);
            }
        }
        if (json.treeBlackList) {
            for (const uuid of json.treeBlackList) {
                const obj: Object3D | undefined = scene.getObjectByProperty('uuid', uuid);
                if (obj) {
                    obj.removeFromParent();
                }
            }
            json.treeBlackList.length = 0;
            OBJECT_TREE_BLACK_LIST.length = 0;
        }
        this.setScene(scene as Scene);
    }

    private setScene(scene: Scene) {

        this.scene.uuid = scene.uuid;
        this.scene.name = scene.name;

        this.scene.background = scene.background;
        this.scene.environment = scene.environment;
        this.scene.fog = scene.fog;

        this.scene.userData = JSON.parse(JSON.stringify(scene.userData));
        for (const child of scene.children) {
            this.scene.add(child);
        }
    }

}
