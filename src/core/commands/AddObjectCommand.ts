import {Object3D} from 'three';
import Constant from '../../constant/Constant';
import {Command} from "../Type";

export default class AddObjectCommand implements Command {
    name = 'add object';
    private _object: Object3D;

    constructor(object: Object3D) {
        this._object = object;
    }

    exec(): void {
        Constant.rawVar.scene.add(this._object);
    }

    undo(): void {
        Constant.rawVar.scene.remove(this._object);
    }
}
