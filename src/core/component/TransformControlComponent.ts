import PaneManager from "../PaneManager";
import objectChanged from "../ObjectChanged";
import { OBJECT_TREE_BLACK_LIST } from "../../config/Config";
import state from "../State";
import Jarvis from "../Jarvis";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

export default class TransformControlComponent {

    private readonly jarvis: Jarvis;
    private _control!: TransformControls;

    constructor(jarvis: Jarvis) {
        this.jarvis = jarvis;
    }


    get control(): TransformControls {
        return this._control;
    }

    init(){
        const transformControls = new TransformControls(this.jarvis.state.activeCamera, this.jarvis.renderer.domElement);
        transformControls.layers.set(1);
        transformControls.getRaycaster().layers.set(1);
        for (const child of transformControls.children) {
            child.traverse(object => {
                object.layers.set(1);
            });
        }
        this._control = transformControls;
        OBJECT_TREE_BLACK_LIST.push(this._control.uuid);
        this.event(this.jarvis);
    }


    private event(jarvis:Jarvis) {
        this._control.addEventListener("objectChange", (e) => {
            PaneManager.update();
            objectChanged.getInstance().update();
        });
        this._control.addEventListener("mouseDown", function(e) {
            jarvis.control.enabled = false;
        });
        this._control.addEventListener("mouseUp", function(e) {
            jarvis.control.enabled = true;
        });

        OBJECT_TREE_BLACK_LIST.push(this._control.uuid);
    }

}
