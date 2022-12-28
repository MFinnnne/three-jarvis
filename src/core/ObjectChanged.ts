import { ColorRepresentation, Object3D } from "three";
import state from "./State";
import HelperManager from "./HelperManager";

class ObjectChanged {

    /**
     *   boxed  mesh
     * @param object
     * @param color
     */
    public objectHelper(object: Object3D, color: ColorRepresentation = 0xffff00): void {
        state.selectedObject = object;
        if (object.type === 'Scene') {
            return;
        }
        HelperManager.render(object);
        return;
    }


    public update(target?: Object3D): void {
        debugger
        const object = target ?? state.selectedObject;
        if (object == null) {
            return;
        }
        if (state.selectedObject.uuid === object.uuid) {
            this.objectHelper(object);
        }
    }
}

const objectChanged = new ObjectChanged();
export default objectChanged;
