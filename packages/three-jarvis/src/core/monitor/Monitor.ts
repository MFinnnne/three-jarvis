import {PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import ObjectChanged from '../ObjectChanged';
import GUI from '../../app/GUI';
import MonitorControlPane from '../../app/pane/MonitorControlPane';
import General from '../General';

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
			control?: OrbitControls;
		},
	) {
		this._scene = scene;
		this._camera = camera;
		this.camera.lookAt(0, 0, 0);
		this.camera.name = 'jarvis-camera';
		this.camera.layers.enableAll();

		this._renderer = renderer;
		this._container = renderer.domElement;


		this.initOrbitControl(option?.control ?? new OrbitControls(this.camera, this.renderer.domElement));
		this.control.addEventListener('end', () => {
			this._orbitControlIsWorking = false;
		});
		this.control.addEventListener('start', () => {
			this._orbitControlIsWorking = true;
		});
		ObjectChanged.getInstance(this);
		GUI.guiContainerInit(this);
		new MonitorControlPane(this).genPane();
		this.state.activeCamera = this._camera;
		this.initTransformControl();
		this.scene.add(this.transformControl);
	}

}
