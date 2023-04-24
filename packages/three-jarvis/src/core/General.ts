import dayjs from 'dayjs';
import {HemisphereLight, Object3D, OrthographicCamera, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {TransformControls} from 'three/examples/jsm/controls/TransformControls';
import {OBJECT_TREE_BLACK_LIST} from '../config/Config';
import SetPositionCommand from './commands/SetPositionCommand';
import SetRotationCommand from './commands/SetRotationCommand';
import SetScaleCommand from './commands/SetScaleCommand';
import objectChanged from './ObjectChanged';
import Recorder from './Recorder';
import State from './State';

export default abstract class General {
	protected _camera: PerspectiveCamera | OrthographicCamera = new PerspectiveCamera();
	protected _renderer!: WebGLRenderer;

	protected _time: string = dayjs().format();
	protected _light = new HemisphereLight(0xffffbb, 0x080820, 1);
	protected _scene!: Scene;
	protected _container!: HTMLCanvasElement;
	protected _control!: OrbitControls;
	protected _transformControl!: TransformControls;

	protected _state!: State;
	protected _recorder!: Recorder;
	protected _orbitControlIsWorking = false;

	protected _paneContainer!: HTMLElement;

	private _leftSideBarContainer!: HTMLElement;
	private _fps = 0;

	private _onSave?: ((json: String) => void) | undefined;
	private _onUpdate?: ((json: String) => void) | undefined;
	private _onLoad?: (() => String) | undefined;
	private _onDelete?: ((obj: Object3D) => void) | undefined;

	constructor() {
		this._state = new State(this);
	}

	public get onDelete(): ((obj: Object3D) => void) | undefined {
		return this._onDelete;
	}
	public set onDelete(value: ((obj: Object3D) => void) | undefined) {
		this._onDelete = value;
	}
	public get onLoad(): (() => String) | undefined {
		return this._onLoad;
	}
	public set onLoad(value: (() => String) | undefined) {
		this._onLoad = value;
	}

	public get onUpdate(): ((json: String) => void) | undefined {
		return this._onUpdate;
	}
	public set onUpdate(value: ((json: String) => void) | undefined) {
		this._onUpdate = value;
	}

	public get onSave(): ((json: String) => void) | undefined {
		return this._onSave;
	}

	public set onSave(value: ((json: String) => void) | undefined) {
		this._onSave = value;
	}

	public get fps() {
		return this._fps;
	}
	public set fps(value) {
		this._fps = value;
	}

	get leftSideBarContainer(): HTMLElement {
		return this._leftSideBarContainer;
	}

	set leftSideBarContainer(value: HTMLElement) {
		this._leftSideBarContainer = value;
	}

	get paneContainer(): HTMLElement {
		return this._paneContainer;
	}

	set paneContainer(value: HTMLElement) {
		this._paneContainer = value;
	}

	get camera(): PerspectiveCamera | OrthographicCamera {
		return this._camera;
	}

	get renderer(): WebGLRenderer {
		return this._renderer;
	}

	get time(): string {
		return this._time;
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

	get transformControl(): TransformControls {
		return this._transformControl;
	}

	get state(): State {
		return this._state;
	}

	get recorder(): Recorder {
		return this._recorder;
	}

	get orbitControlIsWorking(): boolean {
		return this._orbitControlIsWorking;
	}

	protected initTransformControl() {
		const transformControl = new TransformControls(this.state.activeCamera, this.renderer.domElement);
		transformControl.userData.isShow = false;
		this._transformControl = transformControl;
		this._transformControl.name = 'jarvis-transform-control';
		transformControl.layers.set(1);
		transformControl.getRaycaster().layers.set(1);

		for (const child of transformControl.children) {
			child.traverse((object) => {
				object.layers.set(1);
			});
		}
		OBJECT_TREE_BLACK_LIST.push(transformControl.uuid);
		transformControl.addEventListener('objectChange', () => {
			transformControl.object?.userData.controlPane?.update();
			objectChanged.getInstance().update();
		});

		transformControl.addEventListener('change', () => {
			transformControl.object?.userData.helper?.update();
		});

		transformControl.addEventListener('mouseDown', () => {
			this.control.enabled = false;
			this.recordByTransformControl(transformControl);
		});

		transformControl.addEventListener('mouseUp', () => {
			this.control.enabled = true;
		});
	}

	private recordByTransformControl(transformControl: TransformControls) {
		if (transformControl.object) {
			switch (transformControl.getMode()) {
				case 'rotate':
					this.recorder.execute(new SetRotationCommand(transformControl.object, transformControl.object.rotation));
					break;
				case 'scale':
					this.recorder.execute(new SetScaleCommand(transformControl.object, transformControl.object.scale));
					break;
				case 'translate':
					this.recorder.execute(new SetPositionCommand(transformControl.object, transformControl.object.position));
					break;
				default:
					break;
			}
		}
	}
}
