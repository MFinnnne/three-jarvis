import Dexie, {PromiseExtended, Table} from 'dexie';
import Jarvis from '../Jarvis';
import dayjs from 'dayjs';
import {OBJECT_TREE_BLACK_LIST} from '../../config/Config';


export type SceneEntity = {
    id: string;
    ts: number;
    updateTime: string;
    treeBlackList?: Array<string>;
    script?: { uuid: string; code: string }[];
    camera?: { metadata?: any; geometries?: any; materials?: any; textures?: any; images?: any; object?: any };
    scene?: { metadata?: any; geometries?: any; materials?: any; textures?: any; images?: any; object?: any };
};

type realSceneEntity = { id: string, ts: number, updateTime: string, content: ArrayBuffer }

class SceneDB extends Dexie {
    private scene!: Table<realSceneEntity, string>;
    private lastUpdateId?: number;

    public constructor() {
        super('SceneDB');
        this.version(1).stores({
            scene: '&id,ts,updateTime,content',
        });
    }

    addJson(json: SceneEntity) {
        this.transaction('rw', this.scene, async () => {
            const stringify = JSON.stringify(json);
            const array = new TextEncoder().encode(stringify);
            await this.scene.add({id: json.id, updateTime: dayjs().format(), ts: dayjs().unix(), content: array});
        })
            .then(() => {
                console.info(`scene ${json.id} store success`);
            })
            .catch((reason) => {
                console.warn(`scene ${json.id} store fail`);
            });
    }

    addScene(jarvis: Jarvis) {
        this.transaction('rw', this.scene, async () => {
            const res = {
                id: jarvis.container.id,
                camera: jarvis.camera.toJSON(),
                scene: jarvis.scene.toJSON(),
                ts: dayjs().unix(),
                updateTime: dayjs().format(),
                treeBlackList: Array.from(new Set(OBJECT_TREE_BLACK_LIST))
            };
            await this.scene.add({
                id: res.id,
                ts: res.ts,
                updateTime: res.updateTime,
                content: new TextEncoder().encode(JSON.stringify(res))
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
        return this.scene.where('id').equals(id).first().then(value => {
            return JSON.parse(new TextDecoder().decode(value?.content));
        });
    }

    getAll(): PromiseExtended<Array<SceneEntity>> {
        return this.scene.toArray();
    }

    updateScene(jarvis: Jarvis) {
        const res = {
            script: {},
            camera: jarvis.camera.toJSON(),
            scene: jarvis.scene.toJSON(),
            ts: dayjs().unix(),
            updateTime: dayjs().format(),
            treeBlackList: Array.from(new Set(OBJECT_TREE_BLACK_LIST)),
        };
        this.scene
            .where('id')
            .equals(jarvis.container.id)
            .modify({
                ts: res.ts,
                updateTime: res.updateTime,
                content: new TextEncoder().encode(JSON.stringify(res))
            });
    }

    async countById(id: string): Promise<number> {
        return this.scene.where('id').equals(id).count();
    }

    lazyUpsertScene(jarvis: Jarvis) {
        if (this.lastUpdateId) {
            clearTimeout(this.lastUpdateId);
        }
        this.lastUpdateId = window.setTimeout(() => {
            const startTime =  Date.now();
            this.scene
                .where('id')
                .equals(jarvis.container.id)
                .count()
                .then((count) => {
                    if (count !== 0) {
                        this.updateScene(jarvis);
                    } else {
                        this.addScene(jarvis);
                    }
                })
                .then(() => {
                    console.info(`store scene:${dayjs().format()},time:${ Date.now() - startTime}ms`);
                });
        }, 1000);
    }
}


const sceneDB = new SceneDB();
export default sceneDB;
