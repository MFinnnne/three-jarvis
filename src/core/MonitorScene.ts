import {Object3D, Scene} from "three";
import {numberFromUnknown} from "@tweakpane/core";
import VDOM from "./VDOM";

type Trace = {
    curNode: Object3D,
    parentNode: Object3D,
    childNode: Object3D
}

class MonitorScene {

    private static childNum: number = 0;

    static updateVNodeTree(scene: Scene) {
        const curChild = scene.children.flat().length;
        if (curChild !== this.childNum) {
        }
    }

    static needUpdate():boolean{
        return true;
    }
}
