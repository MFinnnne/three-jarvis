import objectDB, { ObjectEntity } from "./mapper/ObjectDB";
import Constant from "../constant/Constant";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export default class Recover {

    private static loader = new OBJLoader();

    public static start() {
        objectDB.findAllObject().then(objects => {
            this.loadObject(objects, objects[0]);
        });
    }

    private static loadObject(objects: ObjectEntity[], cur: ObjectEntity) {

    }
}
