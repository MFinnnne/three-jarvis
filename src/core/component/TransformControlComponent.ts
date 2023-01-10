import PaneManager from '../PaneManager';
import objectChanged from '../ObjectChanged';
import { OBJECT_TREE_BLACK_LIST } from '../../config/Config';
import state from '../State';
import Jarvis from '../Jarvis';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import sceneDB from '../mapper/SceneDB';
import SetPositionCommand from '../commands/SetPositionCommand';
import SetQuaternionCommand from '../commands/SetQuaternionCommand';
import SetScaleCommand from '../commands/SetScaleCommand';
import SetRotationCommand from '../commands/SetRotationCommand';

export default class TransformControlComponent {
    private readonly jarvis: Jarvis;
    private _control!: TransformControls;

    constructor(jarvis: Jarvis) {
        this.jarvis = jarvis;
    }

    get control(): TransformControls {
        return this._control;
    }

    init() {
        const transformControls = new TransformControls(
            this.jarvis.state.activeCamera,
            this.jarvis.renderer.domElement,
        );
        transformControls.layers.set(1);
        transformControls.getRaycaster().layers.set(1);
        for (const child of transformControls.children) {
            child.traverse((object) => {
                object.layers.set(1);
            });
        }
        this._control = transformControls;
        OBJECT_TREE_BLACK_LIST.push(this._control.uuid);
        this.event();
    }

    private event() {
        this._control.addEventListener('objectChange', (e) => {
            PaneManager.update();
            objectChanged.getInstance().update();
        });
        this._control.addEventListener('mouseDown', (e) => {
            this.jarvis.control.enabled = false;
        });
        this._control.addEventListener('mouseUp', (e) => {
            this.jarvis.control.enabled = true;
            sceneDB.lazyUpsertScene(this.jarvis);
            if (this._control.object) {
                this.jarvis.recorder.execute(
                    new SetPositionCommand(this._control.object, this._control.object.position),
                );
                this.jarvis.recorder.execute(
                    new SetQuaternionCommand(this._control.object, this._control.object.quaternion),
                );
                this.jarvis.recorder.execute(new SetScaleCommand(this._control.object, this._control.object.scale));
                this.jarvis.recorder.execute(
                    new SetRotationCommand(this._control.object, this._control.object.rotation),
                );
            }
        });

        OBJECT_TREE_BLACK_LIST.push(this._control.uuid);
    }
}
