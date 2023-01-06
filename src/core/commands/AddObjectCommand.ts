import {Object3D} from "three";
import {Command} from "../Type";

export default class AddObjectCommand implements Command {
    name = "add object";
    private readonly _object: Object3D;
    private readonly _parent: Object3D;

    constructor(parent: Object3D, object: Object3D) {
        this._parent = parent;
        this._object = object;
    }

    exec(): void {
        this._parent.add(this._object);
    }

    undo(): void {
        this._object.removeFromParent();
    }
}
