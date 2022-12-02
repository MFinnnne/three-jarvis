import {TransformControls} from "three/examples/jsm/controls/TransformControls";
import Constant from "../../constant/Constant";
import PaneManager from "../PaneManager";
import {OBJECT_TREE_BLACK_LIST} from "../../config/Config";
import objectChanged from "../ObjectChanged";
import TransformControlComponent from "../component/TransformControlComponent";

export function TransformControl() {
    TransformControlComponent.event();
}
