import { Object3D } from 'three';
import { Command } from '../Type';
import Toast from '../../app/Toast';

export default class AddObjectCommand implements Command {
    name = 'add object';
    private readonly _object: Object3D;
    private readonly _parent: Object3D;

    constructor(parent: Object3D, object: Object3D) {
        this._parent = parent;
        this._object = object;
    }

    exec(): void {
        if (this._parent ) {
            this._parent.add(this._object);
            return;
        }
        Toast.show('The added model must select the parent object');
    }

    undo(): void {
        this._object.removeFromParent();
    }
}
