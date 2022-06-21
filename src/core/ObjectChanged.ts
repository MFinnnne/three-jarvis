import {
    BoxHelper,
    ColorRepresentation,
    DirectionalLight,
    DirectionalLightHelper,
    HemisphereLight,
    HemisphereLightHelper,
    Object3D,
    PointLight,
    PointLightHelper,
} from 'three';
import Constant from '../constant/Constant';
import state from './State';
import HelperManager from './HelperManager';
import PaneManager from "./PaneManager";

class ObjectChanged {

    /**
     *   boxed  mesh
     * @param object
     * @param color
     */
    public objectHelper(object: Object3D, color: ColorRepresentation = 0xffff00): void {
        if (object.type === 'Scene') {
            return;
        }
        state.selectedObject = object;
        HelperManager.render(object);
        return;
    }


    public update(): void {
        const object = state.selectedObject;
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
