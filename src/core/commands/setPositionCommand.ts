import {Command} from "../../types/types";
import {Object3D, Vector3} from "three";


class SetPositionCommand implements Command {
    oldPosition: Vector3
    newPosition: Vector3
    object: Object3D;
    name = '';

    constructor(object: Object3D, position: Vector3) {
        this.object = object;
        this.oldPosition = object.position.clone();
        this.newPosition = position.clone();
    }

    exec(): void {
        this.object.position.copy(this.newPosition);
        this.object.updateMatrixWorld(true);

    }

    undo(): void {

    }

}
