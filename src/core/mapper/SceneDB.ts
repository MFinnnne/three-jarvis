import Dexie, {PromiseExtended, Table} from 'dexie';
import dayjs from 'dayjs';
import {OBJECT_TREE_BLACK_LIST} from '../../config/Config';
import Creator from "../Creator";


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

    private isExistSet: Set<string> = new Set();

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

    addScene(creator: Creator) {
        this.transaction('rw', this.scene, async () => {
            const res = {
                id: creator.container.id,
                camera: creator.camera.toJSON(),
                scene: creator.scene.toJSON(),
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
                console.info(`scene ${creator.container.id} store success`);
            })
            .catch((reason) => {
                console.warn(`scene ${creator.container.id} store fail`);
            });
    }

    deleteScene(containerId: string) {
        this.scene.where('id').equals(containerId).delete();
    }

    async get(id: string): Promise<SceneEntity | undefined> {
        return this.scene.where('id').equals(id).first().then(value => {
            if (value) {
                return JSON.parse(new TextDecoder().decode(value?.content));
            }
        });
    }

    getAll(): PromiseExtended<Array<SceneEntity>> {
        return this.scene.toArray();
    }

    updateScene(creator: Creator) {
        const sceneJson = creator.scene.toJSON();
        const res = {
            script: {},
            camera: creator.camera.toJSON(),
            scene: sceneJson,
            ts: dayjs().unix(),
            updateTime: dayjs().format(),
            treeBlackList: Array.from(new Set(OBJECT_TREE_BLACK_LIST)),
        };
        const uint8Array = new TextEncoder().encode(JSON.stringify(res));
        this.scene
            .where('id')
            .equals(creator.container.id)
            .modify({
                ts: res.ts,
                updateTime: res.updateTime,
                content: uint8Array
            });
    }

    async countById(id: string): Promise<number> {
        return this.scene.where('id').equals(id).count();
    }

    lazyUpsertScene(creator: Creator) {
        if (this.lastUpdateId) {
            clearTimeout(this.lastUpdateId);
        }
        this.lastUpdateId = window.setTimeout(() => {
            const startTime = Date.now();
            if (this.isExistSet.has(creator.container.id)) {
                if (creator.orbitControlIsWorking) {
                    this.lazyUpsertScene(creator);
                    return;
                }
                this.updateScene(creator);
                console.info(`store scene:${dayjs().format()},time:${Date.now() - startTime}ms`);
                return;
            }
            this.scene
                .where('id')
                .equals(creator.container.id)
                .count()
                .then((count) => {
                    if (creator.orbitControlIsWorking) {
                        this.lazyUpsertScene(creator);
                        return;
                    }
                    if (count !== 0) {
                        this.updateScene(creator);
                    } else {
                        this.addScene(creator);
                    }
                })
                .then(() => {
                    this.isExistSet.add(creator.container.id);
                    console.info(`store scene:${dayjs().format()},time:${Date.now() - startTime}ms`);
                });
        }, 2000);
    }
}


const sceneDB = new SceneDB();
export default sceneDB;
