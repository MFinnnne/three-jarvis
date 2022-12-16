// 模型存储实体
import Dexie, { PromiseExtended } from "dexie";
import Table = Dexie.Table;
import { Object3D } from "three";

export interface ObjectEntity {
    key?: number
    id: number,
    parentId?: number,
    uuid: string,
    content: string
}

class ObjectDB extends Dexie {
    protected objects!: Table<ObjectEntity, number>;

    public constructor() {
        super("ObjectDB");
        this.version(1).stores({
            objects: "++key,id,parentId,uuid,content"
        });
    }

    addObject(object: Object3D, parentId?: number) {
        this.transaction("rw", this.objects, async () => {
            await this.objects.add({ id: object.id, parentId: parentId, uuid: object.uuid, content: object.toJSON() });
        }).then(() => {
            console.info(`模型 ${object.uuid} 存储成功`);
        }).catch(reason => {
            console.warn(`模型 ${object.uuid} 存储失败:${reason}`);
        });
    }

    async findAllObject(): Promise<ObjectEntity[]> {
        return this.objects.toArray();
    }


    async findObjectByUUID(uuid: string): Promise<ObjectEntity | undefined> {
        return this.objects.where("uuid").equals(uuid).first();
    }

    deleteObject(uuid: number) {
        this.objects.where("uuid").equals(uuid).delete();
    }

    deleteObjects() {
        this.objects.clear();
    }

    updateObject(object: Object3D) {
        this.objects.where("id").equals(object.id).modify({ content: object.toJSON() });
    }

    findParentObject(id: number):PromiseExtended<ObjectEntity | undefined> {
        return this.objects.where("id").equals(id).first();
    }
}

const objectDB = new ObjectDB();
export default objectDB;
