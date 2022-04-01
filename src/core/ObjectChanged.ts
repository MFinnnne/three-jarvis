import { BoxHelper, ColorRepresentation, Object3D } from 'three';
import Constant from '../constant/Constant';
import state from './State';

class ObjectChanged {
    private highLightBox?: BoxHelper;

    /**
     *   boxed  mesh
     * @param object
     * @param color
     */
    public highLightMesh(object: Object3D, color: ColorRepresentation = 0xff0000): void {
        if (object.type === 'Scene' || object.type === 'Camera') {
            return;
        }
        state.selectedObject = object;
        if (this.highLightBox) {
            this.highLightBox.setFromObject(object);
            this.highLightBox.update();
            return;
        }
        this.highLightBox = new BoxHelper(Constant.SCENE, color);
        this.highLightBox.layers.mask = 0x00000001 | 1;
        Constant.SCENE.add(this.highLightBox);
    }


    public update(object: Object3D): void {
        if (state.selectedObject.uuid === object.uuid) {
            this.highLightMesh(object);
        }
    }
}

const objectChanged = new ObjectChanged();
export default objectChanged;
