import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { Camera } from "three";
import Constant from "../../constant/Constant";
import PaneManager from "../PaneManager";
import objectChanged from "../ObjectChanged";
import { OBJECT_TREE_BLACK_LIST } from "../../config/Config";

export default class TransformControlComponent {

    public static CONTROLS;

    static init(camera: Camera, element: HTMLElement): TransformControls {
        const transformControls = new TransformControls(camera, element);
        transformControls.layers.set(1);
        transformControls.getRaycaster().layers.set(1);
        for (let child of transformControls.children) {
            child.traverse(object => {
                object.layers.set(1);
            });
        }
        this.CONTROLS = transformControls;
        return transformControls;
    }


    static event() {
        Constant.rawVar.scene.add(this.CONTROLS);
        this.CONTROLS.addEventListener("dragging-changed", (e) => {
        });
        this.CONTROLS.addEventListener("change", (e) => {

        });
        this.CONTROLS.addEventListener("objectChange", (e) => {
            PaneManager.update();
            objectChanged.update();
        });
        this.CONTROLS.addEventListener("mouseDown", function(e) {
            Constant.rawVar.control.enabled = false;
        });
        this.CONTROLS.addEventListener("mouseUp", function(e) {
            Constant.rawVar.control.enabled = true;
        });
        window.addEventListener("keydown", e => {
            switch (e.key) {
                case "=":
                    this.CONTROLS.setSize(this.CONTROLS.size + 0.1);
                    break;
                case "-":
                    this.CONTROLS.setSize(Math.max(this.CONTROLS.size - 0.1, 0.1));
                    break;
                case "s":
                    if (Constant.rawVar.control) {
                        Constant.rawVar.control.enabled = true;
                    }
            }
        });
        OBJECT_TREE_BLACK_LIST.push(this.CONTROLS.uuid);
    }

}
