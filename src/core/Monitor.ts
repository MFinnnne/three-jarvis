import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ObjectChanged from './ObjectChanged';
import GUI from '../app/GUI';
import MonitorControlPane from '../app/pane/MonitorControlPane';
import General from './General';

/**
 * threejs scene monitor，just monitor scene,Any operation not persistent
 * 只能对场景进行监控，所有操作均不能持久化
 */
export default class Monitor extends General {
    public start(
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
        GUI.guiContainerInit(this);
        this.state.activeCamera = this._camera;
        this.initTransformControl();
        new MonitorControlPane(this).genPane();
    }
}
