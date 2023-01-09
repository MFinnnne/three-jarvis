import { Object3D } from 'three';
import { Command } from '../Type';

export default class RemoveObjectCommand implements Command {
    name = 'remove object';
    object!: Object3D;
    parent: Object3D | null;

    constructor(object: Object3D) {
        this.object = object;
        this.parent = object.parent;
    }

    exec(): void {
        this.object.removeFromParent();
    }

    undo(): void {
        this.parent?.add(this.object);
    }
}
