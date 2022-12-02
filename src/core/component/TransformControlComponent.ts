import {TransformControls} from "three/examples/jsm/controls/TransformControls";
import {Camera} from "three";
import Constant from "../../constant/Constant";
import PaneManager from "../PaneManager";
import objectChanged from "../ObjectChanged";
import {OBJECT_TREE_BLACK_LIST} from "../../config/Config";

export default class TransformControlComponent {
    static init(camera: Camera, element: HTMLElement): TransformControls {
        const transformControls = new TransformControls(camera, element);
        transformControls.layers.set(1);
        transformControls.getRaycaster().layers.set(1);
        for (let child of transformControls.children) {
            child.traverse(object => {
                object.layers.set(1);
            })
        }
        return transformControls;
    }

    static event(){
        const control = Constant.rawVar.transformControls;
        Constant.rawVar.scene.add(control);
        control.addEventListener('dragging-changed', (e) => {
            if (Constant.rawVar.control) {
                Constant.rawVar.control.enabled = !e.value
            }

        })
        control.addEventListener('change', (e) => {

        });

        control.addEventListener('objectChange', (e) => {
            PaneManager.update();
            objectChanged.update();
        });
        control.addEventListener('mouseDown', function () {

        });
        control.addEventListener('mouseUp', function () {

        });
        window.addEventListener('keydown', e => {
            switch (e.key) {
                case '=':
                    control.setSize(control.size + 0.1);
                    break;

                case '-':
                    control.setSize(Math.max(control.size - 0.1, 0.1));
                    break;
                case 's':
                    if (Constant.rawVar.control) {
                        Constant.rawVar.control.enabled = true;
                    }
            }
        });
        OBJECT_TREE_BLACK_LIST.push(control.uuid);
        Constant.rawVar.scene.add(control);
    }

}
