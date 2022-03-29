import { BoxHelper, Object3D } from 'three';
import Constant from '../constant/Constant';


let highLightBox: BoxHelper;

/**
 * Helper object to graphically show the world-axis-aligned bounding box around an object.
 * @param object
 */
export function highLightMesh(object: Object3D) {
    if (highLightBox) {
        highLightBox.setFromObject(object);
        highLightBox.update();
        return;
    }
    highLightBox = new BoxHelper(Constant.SCENE, 0xffff00);
    Constant.SCENE.add(highLightBox);

}

