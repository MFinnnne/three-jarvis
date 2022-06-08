import {Command} from "../../types/types";
import {Object3D, Vector3} from "three";

export default class AddObjectCommand implements Command {
    name: string = 'add object';
    private _object: Object3D;

    constructor(object: Object3D) {
        this._object = object;
    }

    exec(): void {

    }

    undo(): void {
    }


}
