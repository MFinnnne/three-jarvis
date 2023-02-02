import { HemisphereLight, OrthographicCamera, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import dayjs from 'dayjs';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import State from './State';
import Recorder from './Recorder';
import { OBJECT_TREE_BLACK_LIST } from '../config/Config';
import PaneManager from './PaneManager';
import objectChanged from './ObjectChanged';
import SetPositionCommand from './commands/SetPositionCommand';
import SetQuaternionCommand from './commands/SetQuaternionCommand';
import SetScaleCommand from './commands/SetScaleCommand';
import SetRotationCommand from './commands/SetRotationCommand';

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
        transformControl.addEventListener('objectChange', (e) => {
            PaneManager.update();
            objectChanged.getInstance().update();
        });
        transformControl.addEventListener('mouseDown', (e) => {
            this.control.enabled = false;
        });
        transformControl.addEventListener('mouseUp', (e) => {
            this.control.enabled = true;
            if (transformControl.object) {
                this.recorder.execute(
                    new SetPositionCommand(transformControl.object, transformControl.object.position),
                );
                this.recorder.execute(
                    new SetQuaternionCommand(transformControl.object, transformControl.object.quaternion),
                );
                this.recorder.execute(new SetScaleCommand(transformControl.object, transformControl.object.scale));
                this.recorder.execute(
                    new SetRotationCommand(transformControl.object, transformControl.object.rotation),
                );
            }
        });
    }
}
