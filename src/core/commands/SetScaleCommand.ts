
import { Group, Object3D, Vector3 } from 'three';
import {Command} from "../Type";

export default class SetScaleCommand implements Command {
    name = 'change scale';
    object: Object3D = new Group();
    newScale: Vector3;
    oldScale: Vector3;

    constructor(object: Object3D, scale: Vector3) {
        this.object = object;
        this.oldScale = object.scale.clone();
        this.newScale = scale.clone();
    }

    exec(): void {
        this.object.scale.copy(this.newScale);
        this.object.updateMatrixWorld(true);
    }

    undo(): void {
        this.name = 'change rotation';
    }
}
