import {Pane} from 'tweakpane';
import {Object3D, Vector3} from 'three';
import Constant from '../constant/Constant';
import DefaultControlPane from "./DefaultControlPane";
import ObjectUpdate from "../core/ObjectChanged";
import toDecimal from "../util/MathUtil";

export default class ObjectControlPane extends DefaultControlPane {
    public genPane(object: Object3D): Pane {
        const PARAMS = {
            position: {
                x: toDecimal(object.position.x),
                y: toDecimal(object.position.y),
                z: toDecimal(object.position.z)
            },
            rotation: {
                x: toDecimal(object.rotation.x),
                y: toDecimal(object.rotation.y),
                z: toDecimal(object.rotation.z)
            }
        }
        this.pane.addInput(PARAMS, 'position').on('change', (ev) => {
            const {x, y, z} = ev.value;
            ObjectUpdate.positionUpdate(object, new Vector3(x, y, z))
        });
        this.pane.addInput(PARAMS, 'rotation');
        return this.pane;
    }
}
