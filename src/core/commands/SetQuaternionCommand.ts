import { Object3D, Quaternion } from 'three';
import { InputBindingApi } from '@tweakpane/core';
import { Point3d } from '@tweakpane/core/dist/es6/input-binding/point-3d/model/point-3d';
import { Command } from '../Type';

export default class SetQuaternionCommand implements Command {
    name = 'change quaternion';
    oldQuaternion: Quaternion;
    newQuaternion: Quaternion;
    object: Object3D;
    bindApi: InputBindingApi<unknown, Quaternion>;

    constructor(object: Object3D, rotation: Quaternion, bindApi: InputBindingApi<unknown, Quaternion>) {
        this.object = object;
        this.oldQuaternion = object.quaternion.clone();
        this.newQuaternion = rotation.clone();
        this.bindApi = bindApi;
    }

    exec(): void {
        this.object.quaternion.copy(this.newQuaternion);
        this.object.updateMatrixWorld(true);
    }

    undo(): void {
        this.name = 'change quaternion';
        this.object.quaternion.copy(this.oldQuaternion);
        this.object.updateMatrixWorld(true);
    }
}
