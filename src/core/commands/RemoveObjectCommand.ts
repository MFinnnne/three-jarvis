import { Command } from "core/Type";
import { Object3D } from "three";
import Constant from "../../constant/Constant";
import ObjectTree from "../../app/ObjectTree";
import ObjectDB from "../mapper/ObjectDB";

export default class RemoveObjectCommand implements Command {
    name: string = "remove object";
    object!: Object3D;
    parent: Object3D | null;

    constructor(object: Object3D) {
        this.object = object;
        this.parent = object.parent;
    }

    exec(): void {
        this.object.removeFromParent();
        ObjectDB.deleteObject(this.object.userData.id);
        this.object.traverse(object => {
            if (object.userData.id) {
                ObjectDB.deleteObject(object.userData.id);
            }
        });
    }

    undo(): void {
        this.parent?.add(this.object);
    }

}
