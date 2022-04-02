import {Box3, Object3D, Vector3} from 'three';
import state from '../core/State';
import Constant from '../constant/Constant';

export default class MyCameraUtil {
    static faceObject(object: Object3D): void {
        const box = new Box3().expandByObject(object);
        const objPos = new Vector3();
        const toWorldPosition = object.getWorldPosition(objPos);
        const max = box.max;
        const min = box.min;
        const diff = max.sub(min);
        const multiplyScalar = diff.multiplyScalar(5);
        const toWorldClone = toWorldPosition.clone();
        const cameraPosition = toWorldClone
            .setY(toWorldPosition.y + multiplyScalar.y)
            .setX(toWorldPosition.x + multiplyScalar.x);
        state.activeCamera.lookAt(toWorldPosition);
        Constant.CONTROL.target.copy(toWorldPosition);
        state.activeCamera.position.copy(cameraPosition);
    }
}
