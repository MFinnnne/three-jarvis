import objectDB, { ObjectEntity } from "./mapper/ObjectDB";
import Constant from "../constant/Constant";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { object } from "million/html";
import { Object3D, ObjectLoader } from "three";

export default class Recover {

    private static loader = new ObjectLoader();

    public static start() {
        objectDB.findAllObject().then(objects => {
            while (objects.length !== 0) {
                let newObjects: ObjectEntity[] = [];
                for (let item of objects) {
                    if (item.parentId == null) {
                        const group = this.loader.parse(item.content);
                        Constant.rawVar.scene.add(group);
                    } else {

                        const objectById = Recover.getObjectByProperty("userData.id", item.parentId);
                        if (objectById) {
                            objectById.add(this.loader.parse(item.content));
                        } else {
                            newObjects.push(item);
                            if (!objects.find(child => child.id === item.parentId)) {

                            }
                        }
                    }
                }
                objects = newObjects;
            }
        });
    }

    private static getObjectByProperty(name: string, value: any): Object3D | undefined {
        let findObj;
        Constant.rawVar.scene.traverse(obj => {
            if (obj.userData?.id === value) {
                findObj = obj;
                return;
            }
        });
        return findObj;
    }
}
