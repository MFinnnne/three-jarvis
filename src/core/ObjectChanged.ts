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
    highLightMesh(object: Object3D, color: ColorRepresentation = 0xffff00): void {
        if (object.type === 'Scene' || object.type === 'Camera') {
            return;
        }
        state.selected = object;
        if (this.highLightBox) {
            this.highLightBox.setFromObject(object);
            this.highLightBox.update();
            return;
        }
        this.highLightBox = new BoxHelper(Constant.SCENE, color);
        Constant.SCENE.add(this.highLightBox);
    }

    public update(object: Object3D): void {
        if (state.selected.uuid === object.uuid) {
            this.highLightMesh(object);
        }
    }
}

const objectChanged = new ObjectChanged();
export default objectChanged;
