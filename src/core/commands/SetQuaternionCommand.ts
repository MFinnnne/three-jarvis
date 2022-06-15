import { Command } from '../../types/types';
import { Object3D, Quaternion } from 'three';
import {InputBindingApi} from "@tweakpane/core";

export default class SetQuaternionCommand implements Command {
    name = 'change quaternion';
    oldQuaternion: Quaternion;
    newQuaternion: Quaternion;
    object: Object3D;

    constructor(object: Object3D, rotation: Quaternion,bindApi:InputBindingApi<Quaternion, Quaternion>) {
        this.object = object;
        this.oldQuaternion = object.quaternion.clone();
        this.newQuaternion = rotation.clone();
    }

    exec(): void {
        this.object.quaternion.copy(this.newQuaternion);
        this.object.updateMatrixWorld(true);
    }

    undo(): void {
        this.name = 'change quaternion';
    }
}
