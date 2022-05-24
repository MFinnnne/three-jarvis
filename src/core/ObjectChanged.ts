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
        this.helpers.forEach((helper) => {
            helper.visible = false;
        });
        switch (object.type) {
            case 'HemisphereLight':
                if (this.hemisphereLightHelper) {
                    this.hemisphereLightHelper.visible = true;
                    this.hemisphereLightHelper.light = object as HemisphereLight;
                    this.hemisphereLightHelper.update();
                    return;
                }
                this.hemisphereLightHelper = new HemisphereLightHelper(object as HemisphereLight, 5);
                this.hemisphereLightHelper.name = 'HemisphereLight_' + Constant.HELPER_NAME;
                this.helperPostProcess(this.hemisphereLightHelper);
                break;
            case 'Group':
            case 'Mesh':
                if (this.highLightBox) {
                    this.highLightBox.visible = true;
                    this.highLightBox.setFromObject(object);
                    this.highLightBox.update();
                    return;
                }
                this.highLightBox = new BoxHelper(Constant.rawVar.scene, color);
                this.highLightBox.layers.mask = 0x00000001 | 1;
                this.highLightBox.name = 'BoxHelper_' + Constant.HELPER_NAME;
                this.helperPostProcess(this.highLightBox);
                break;
            case 'DirectionalLight':
                if (this.directionLightHelper) {
                    this.directionLightHelper.visible = true;
                    this.directionLightHelper.light = object as DirectionalLight;
                    this.directionLightHelper.update();
                    return;
                }
                this.directionLightHelper = new DirectionalLightHelper(object as DirectionalLight, 5);
                this.directionLightHelper.name = 'DirectionalLight_' + Constant.HELPER_NAME;
                this.helperPostProcess(this.directionLightHelper);
                break;
            case 'PointLight':
                if (this.pointLightHelper) {
                    this.pointLightHelper.visible = true;
                    this.pointLightHelper.light = object as PointLight;
                    this.pointLightHelper.update();
                    return;
                }
                this.pointLightHelper = new PointLightHelper(object as PointLight, 5);
                this.pointLightHelper.name = 'PointLight_' + Constant.HELPER_NAME;
                this.helperPostProcess(this.pointLightHelper);
                break;
            default:
                console.log(`${object.type}  is not supported`);
                break;
        }
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
