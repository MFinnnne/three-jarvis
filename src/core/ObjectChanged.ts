import { BoxHelper, Object3D, Vector3 } from 'three';
import Constant from '../constant/Constant';
import state from './State';

class ObjectChanged {

    private highLightBox?: BoxHelper;
    private static instance: ObjectChanged;



    /**
     *   boxed  mesh
     * @param object
     */
    highLightMesh(object: Object3D): void {
        if (object.type === 'Scene' || object.type === 'Camera') {
            return;
        }
        if (this.highLightBox) {
            this.highLightBox.setFromObject(object);
            this.highLightBox.update();
            return;
        }
        this.highLightBox = new BoxHelper(Constant.SCENE, 0xffff00);
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

