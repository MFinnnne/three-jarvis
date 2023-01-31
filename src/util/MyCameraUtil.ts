import { Box3, Object3D, Vector3 } from 'three';

export default class MyCameraUtil {
    static faceObject(object: Object3D): void {
        const box = new Box3().expandByObject(object);
        const objPos = new Vector3();
        const toWorldPosition = object.getWorldPosition(objPos);
        const max = box.max;
        const min = box.min;
        const diff = max.sub(min);
    }
}
