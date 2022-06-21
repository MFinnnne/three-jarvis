import {TransformControls} from "three/examples/jsm/controls/TransformControls";
import Constant from "../../constant/Constant";
import PaneManager from "../PaneManager";
import {OBJECT_TREE_BLACK_LIST} from "../../config/Config";
import objectChanged from "../ObjectChanged";

export function TransformControl(){
    const control = Constant.rawVar.transformControls;
    Constant.rawVar.scene.add(control);
    control.addEventListener('dragging-changed', (e) => {
        if (Constant.rawVar.control) {
            Constant.rawVar.control.enabled = !e.value
        }
    })
    control.addEventListener('change', (e) => {
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
