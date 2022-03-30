import { Command } from '../../types/types';
import { Euler, Object3D, Vector3 } from 'three';

export  default  class SetRotationCommand implements Command {
    name = 'change rotation';
    oldRotation: Euler;
    newRotation: Euler;
    object: Object3D;

    constructor(object: Object3D, rotation: Euler) {
        this.object = object;
        this.oldRotation = object.rotation.clone();
        this.newRotation = rotation.clone();
    }

    exec(): void {
        this.object.rotation.copy(this.newRotation);
        this.object.updateMatrixWorld(true);
    }

    undo(): void {
        this.name = 'change rotation';
    }

}
