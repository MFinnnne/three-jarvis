import {
    BoxHelper,
    ColorRepresentation, DirectionalLight,
    DirectionalLightHelper,
    HemisphereLight,
    HemisphereLightHelper,
    Object3D, PointLight, PointLightHelper,
} from 'three';
import Constant from '../constant/Constant';
import state from './State';

class ObjectChanged {
    private highLightBox?: BoxHelper;
    private hemisphereLightHelper?: HemisphereLightHelper;
    private directionLightHelper?: DirectionalLightHelper;
    private pointLightHelper?: PointLightHelper;

    /**
     *   boxed  mesh
     * @param object
     * @param color
     */
    public objectHelper(object: Object3D, color: ColorRepresentation = 0xffff00): void {
        if (object.type === 'Scene') {
            return;
        }
        switch (object.type) {
            case 'HemisphereLight':
                this.hemisphereLightHelper?.dispose();
                this.hemisphereLightHelper = new HemisphereLightHelper(object as HemisphereLight, 5);
                Constant.SCENE.add(this.hemisphereLightHelper);
                break;
            case 'Mesh':
                state.selectedObject = object;
                if (this.highLightBox) {
                    this.highLightBox.setFromObject(object);
                    this.highLightBox.update();
                    return;
                }
                this.highLightBox = new BoxHelper(Constant.SCENE, color);
                this.highLightBox.layers.mask = 0x00000001 | 1;
                Constant.SCENE.add(this.highLightBox);
                break;
            case 'DirectionalLight':
                this.directionLightHelper?.dispose();
                this.directionLightHelper = new DirectionalLightHelper(object as DirectionalLight, 5);
                Constant.SCENE.add(this.directionLightHelper);
                break;
            case 'PointLight':
                this.pointLightHelper?.dispose();
                this.pointLightHelper = new PointLightHelper(object as PointLight, 5);
                Constant.SCENE.add(this.pointLightHelper);
                break;
            default:
                console.log(`${object.type}  is not supported`);
                break;
        }
        return;
    }

    public update(object: Object3D): void {
        if (state.selectedObject.uuid === object.uuid) {
            this.objectHelper(object);
        }
    }
}

const objectChanged = new ObjectChanged();
export default objectChanged;
