import { Euler, Object3D, Vector3 } from 'three';
import {InputBindingApi} from "@tweakpane/core";
import {Command} from "../Type";

export default class SetRotationCommand implements Command {
    name = 'change rotation';
    oldRotation: Euler;
    newRotation: Euler;
    object: Object3D;
    bindApi:InputBindingApi<unknown, Vector3>

    constructor(object: Object3D, rotation: Euler,bindApi:InputBindingApi<unknown, Vector3>) {
        this.object = object;
        this.oldRotation = object.rotation.clone();
        this.bindApi = bindApi;
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
