import objectDB, { ObjectEntity } from "./mapper/ObjectDB";
import Constant from "../constant/Constant";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { object } from "million/html";

export default class Recover {

    private static loader = new OBJLoader();

    public static start() {
        objectDB.findAllObject().then(objects => {
            setInterval(() => {
                objects.forEach((item) => {
                    if (item.id == null) {
                        const group = this.loader.parse(item.content);
                        Constant.rawVar.scene.add(group);
                        objects = objects.filter(obj => obj.id == item.id);
                    }
                    const objectById = Constant.rawVar.scene.getObjectById(item.id);
                    if (objectById != null) {
                        objects = objects.filter(obj => obj.id == item.id);
                    }
                });
            }, 1000);
        });
    }
}
