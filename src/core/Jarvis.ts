import {
    BoxGeometry,
    Camera,
    GridHelper,
    HemisphereLight,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "../app/GUI";
import state from "./State";
import MonitorControlPane from "../app/pane/MonitorControlPane";
import TransformControlComponent from "./component/TransformControlComponent";
import ObjectChanged from "./ObjectChanged";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import PaneManager from "./PaneManager";
import { rayCasterEvents } from "./events/ObjectEvents";


export default class Jarvis {

    private _camera: PerspectiveCamera = new PerspectiveCamera();
    private _renderer!: WebGLRenderer;

    private _light = new HemisphereLight(0xffffbb, 0x080820, 1);
    private _scene!: Scene;
    private _container!: HTMLCanvasElement;
    private _control!: OrbitControls;
    private _transformControl!: TransformControls;

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

    get control(): OrbitControls {
        return this._control;
    }

    monitor(scene: Scene, renderer: WebGLRenderer, camera: PerspectiveCamera, option?: {
        control: OrbitControls
    }) {
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
        state.activeCamera = this._camera;
        new MonitorControlPane(this).genPane();
    }

    creator(container: HTMLCanvasElement) {
        this._renderer = new WebGLRenderer({ canvas: container });
        this._camera.lookAt(0, 0, 0);
        this._container = container;
        this._scene = new Scene();

        this.init();
    }


    private init() {
        this._camera = new PerspectiveCamera();
        this._camera.name = "jarvis-camera";
        this._camera.layers.enableAll();
        this._scene.add(this._camera);
        this._control = new OrbitControls(this._camera, this._renderer.domElement);
        this._control.minDistance = 2;
        this._control.maxDistance = 1000;
        this._control.update();
        this._camera.position.set(8, 8, 8);

        ObjectChanged.getInstance(this);
        state.activeCamera = this._camera;

        const controlComponent = new TransformControlComponent(this);
        controlComponent.init();
        PaneManager.init(this);
        this._transformControl = controlComponent.control;

        this._scene.add(this._light);
        const gridHelper = new GridHelper(20, 20);
        gridHelper.layers.set(3);
        this._scene.add(gridHelper);

        const boxGeometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({ color: 0x00ff00 });
        const mesh = new Mesh(boxGeometry, material);
        mesh.position.set(1, 1, 1);
        this._scene?.add(mesh);

        this.onWindowResize();
        this.render();
        GUI.guiContainerInit(this);
        rayCasterEvents(this);
        new MonitorControlPane(this).genPane();
    }


    private onWindowResize() {
        this._camera!.aspect = this._container!.offsetWidth / this._container!.offsetHeight;
        this._camera!.updateProjectionMatrix();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private render() {
        requestAnimationFrame(this.render.bind(this));
        this._renderer.render(this._scene,state.activeCamera);
        this._control.update();
    }
}
