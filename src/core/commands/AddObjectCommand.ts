import { Object3D } from "three";
import { Command } from "../Type";
import objectDB from "../mapper/ObjectDB";
import state from "../State";

export default class AddObjectCommand implements Command {
    name = "add object";
    private readonly _object: Object3D;

    constructor(object: Object3D) {
        this._object = object;
    }

    exec(): void {
        if (state.selectedObject.type === "Scene") {
            objectDB.addObject(this._object);
            state.selectedObject.add(this._object);
        }
        if (state.selectedObject.id !== null) {
            objectDB.addObject(this._object, state.selectedObject.id);
            state.selectedObject.add(this._object);
        }
        console.error("imported object's parent must be set id property");
    }

    undo(): void {
        this._object.removeFromParent();
    }
}
