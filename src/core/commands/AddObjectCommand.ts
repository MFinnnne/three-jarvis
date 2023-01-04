import { Object3D } from "three";
import { Command } from "../Type";
import objectDB from "../mapper/ObjectDB";
import state from "../State";
import ObjectTree from "../../app/ObjectTree";
import Constant from "../../constant/Constant";
import moment from "moment";
import Toast from "../../app/Toast";

export default class AddObjectCommand implements Command {
    name = "add object";
    private readonly _object: Object3D;

    constructor(object: Object3D) {
        this._object = object;
    }

    exec(): void {
        if (state.selectedObject.type === "Scene") {
            objectDB.addObject(this._object);
            Constant.rawVar.scene.add(this._object);
            this._object.userData.id = moment().milliseconds();
            return;
        }
        if (state.selectedObject.userData.id !== undefined) {
            this._object.userData.id = moment().milliseconds();
            objectDB.addObject(this._object, state.selectedObject.userData.id);
            state.selectedObject.add(this._object);
            return;
        }
        Toast.show("imported object's parent must be set userData.id property");
    }

    undo(): void {
        this._object.removeFromParent();
    }
}
