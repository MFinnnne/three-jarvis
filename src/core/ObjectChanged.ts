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
import HelperManager from "./HelperManager";

class ObjectChanged {
    private highLightBox?: BoxHelper;
    private hemisphereLightHelper?: HemisphereLightHelper;
    private directionLightHelper?: DirectionalLightHelper;
    private pointLightHelper?: PointLightHelper;
    private helpers: Array<Object3D> = [];

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

    private helperPostProcess(helper: Object3D) {
        this.helpers.push(helper);
        Constant.rawVar.scene.add(helper);
    }

    public update(object: Object3D): void {
        if (state.selectedObject.uuid === object.uuid) {
            this.objectHelper(object);
        }
    }
}

const objectChanged = new ObjectChanged();
export default objectChanged;
