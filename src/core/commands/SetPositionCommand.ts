import {Command} from '../../types/types';
import {Object3D, Quaternion, Vector3} from 'three';
import {InputBindingApi} from "@tweakpane/core";
import {Point3d, Point3dObject} from "@tweakpane/core/dist/es6/input-binding/point-3d/model/point-3d";
import {Point3dInputParams} from "tweakpane";

export default class SetPositionCommand implements Command {
    oldPosition: Vector3;
    newPosition: Vector3;
    private _object: Object3D;
    name = '';
    bindApi: InputBindingApi<unknown, Point3dObject>;

    constructor(object: Object3D, position: Vector3, bindApi: InputBindingApi<unknown, Point3dObject>) {
        this._object = object;
        this.oldPosition = object.position.clone();
        this.newPosition = position.clone();
        this.bindApi = bindApi;
    }

    get object(): Object3D {
        return this._object;
    }

    set object(value: Object3D) {
        this._object = value;
    }

    exec(): void {
        this._object.position.copy(this.newPosition);
        this._object.updateMatrixWorld(true);
        const {x, y, z} = this.newPosition;
        this.bindApi.controller_.binding.value.rawValue = new Point3d(x, y, z);
    }

    undo(): void {
        this._object.position.copy(this.oldPosition);
        this._object.updateMatrixWorld(true);
        const {x, y, z} = this.oldPosition;
        this.bindApi.controller_.binding.value.rawValue = new Point3d(x, y, z);
    }
}
