import {Object3D, Vector3} from "three";

class ObjectChanged {

    positionUpdate(object: Object3D, position: Vector3) {
        object.position.copy(position)
    }
}

export default new ObjectChanged();

