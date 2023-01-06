import Dexie, { PromiseExtended, Table } from 'dexie';
import Jarvis from '../Jarvis';
import dayjs from 'dayjs';
import { OBJECT_TREE_BLACK_LIST } from '../../config/Config';

export type SceneEntity = {
    key?: number;
    id: string;
    ts: number;
    updateTime: string;
    treeBlackList: Array<string>;
    script?: { uuid: string; code: string }[];
    camera: { metadata?: any; geometries?: any; materials?: any; textures?: any; images?: any; object?: any };
    scene: { metadata?: any; geometries?: any; materials?: any; textures?: any; images?: any; object?: any };
};

class SceneDB extends Dexie {
    private scene!: Table<SceneEntity, number>;

    public constructor() {
        super('SceneDB');
        this.version(1).stores({
            scene: '++key,ts,id,updateTime,treeBlackList,script,camera,scene',
        });
    }

    addScene(jarvis: Jarvis) {
        this.transaction('rw', this.scene, async () => {
            await this.scene.add({
                id: jarvis.container.id,
                camera: jarvis.camera.toJSON(),
                scene: jarvis.scene.toJSON(),
                ts: dayjs().unix(),
                updateTime: dayjs().format(),
                treeBlackList: Array.from(new Set(OBJECT_TREE_BLACK_LIST)),
            });
        })
            .then(() => {
                console.info(`scene ${jarvis.container.id} store success`);
            })
            .catch((reason) => {
                console.warn(`scene ${jarvis.container.id} store fail`);
            });
    }

    deleteScene(containerId: string) {
        this.scene.where('id').equals(containerId).delete();
    }

    async get(id: string): Promise<SceneEntity | undefined> {
        return this.scene.where('id').equals(id).first();
    }

    getAll(): PromiseExtended<Array<SceneEntity>> {
        return this.scene.toArray();
    }

    async updateScene(jarvis: Jarvis) {
        await this.scene
            .where('id')
            .equals(jarvis.container.id)
            .modify({
                script: {},
                camera: jarvis.camera.toJSON(),
                scene: jarvis.scene.toJSON(),
                ts: dayjs().unix(),
                updateTime: dayjs().format(),
                treeBlackList: Array.from(new Set(OBJECT_TREE_BLACK_LIST)),
            });
    }

    async countById(id: string): Promise<number> {
        return this.scene.where('id').equals(id).count();
    }

    async upsertScene(jarvis: Jarvis): Promise<void> {
        const res = await this.scene.where('id').equals(jarvis.container.id).count();
        if (res !== 0) {
            await this.updateScene(jarvis);
        } else {
            this.addScene(jarvis);
        }
    }
}

const sceneDB = new SceneDB();
export default sceneDB;
