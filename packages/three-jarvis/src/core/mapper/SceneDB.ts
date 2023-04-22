import dayjs from 'dayjs';
import Dexie, {PromiseExtended, Table} from 'dexie';
import {Scene} from 'three';
import Creator from '../Creator';

export type SceneEntity = {
	id: string;
	ts: number;
	updateTime: string;
	script: {uuid: string; code: string}[];
	camera: {metadata?: any; geometries?: any; materials?: any; textures?: any; images?: any; object?: any};
	scene: {metadata?: any; geometries?: any; materials?: any; textures?: any; images?: any; object?: any};
};

class SceneDB extends Dexie {
	private scene!: Table<SceneEntity, string>;
	private lastUpdateId?: number;

	private isExistSet: Set<string> = new Set();

	public constructor() {
		super('SceneDB');
		this.version(1).stores({
			scene: '&id,ts,updateTime,script,camera,scene',
		});
	}

	addJson(json: SceneEntity) {
		this.transaction('rw', this.scene, async () => {
			const stringify = JSON.stringify(json);
			const array = new TextEncoder().encode(stringify);
			await this.scene.add({
				id: json.id,
				updateTime: dayjs().format(),
				ts: dayjs().unix(),
				script: [],
				camera: json.camera,
				scene: json.scene,
			});
		})
			.then(() => {
				console.info(`scene ${json.id} store success`);
			})
			.catch((reason) => {
				console.warn(`scene ${json.id} store fail`);
			});
	}

	private filterScene(scene: Scene): any {
		const json = scene.toJSON();
		const deleteObjects: Array<String> = [];
		json.object?.children.forEach((item) => {
			if (item.userData?.isShow !== undefined) {
				if (item.userData.isShow === false) {
					this.deleteMaterialAndGeometries(json, item);
					deleteObjects.push(item.uuid);
				}
			}
		});
		// delete object by uuid
		for (const key in deleteObjects) {
			//filter out objects that have children
			json.object.children = json.object?.children.filter((item) => item.uuid !== deleteObjects[key]);
		}
		json.object?.children.forEach((item) => {
			item.userData = {};
		});
		return json;
	}

	private deleteMaterialAndGeometries(scene: any, object: any) {
		if (object.material) {
			scene.materials = scene.materials.filter((item: any) => {
				return item.uuid !== object.material;
			});
		}
		// delete geometries
		if (object.geometry) {
			scene.geometries = scene.geometries.filter((item: any) => {
				return item.uuid !== object.geometry;
			});
		}
		if (object.children) {
			object.children.forEach((item: any) => {
				this.deleteMaterialAndGeometries(scene, item);
			});
		}
	}

	addScene(creator: Creator) {
		const json = this.filterScene(creator.scene);

		this.transaction('rw', this.scene, async () => {
			const res = {
				id: creator.container.id,
				camera: creator.camera.toJSON(),
				script: [],
				scene: json,
				ts: dayjs().unix(),
				updateTime: dayjs().format(),
			};
			if (creator.onSave) {
				creator.onSave(JSON.stringify(res));
			} else {
				await this.scene.add(res);
			}
		})
			.then(() => {
				console.info(`scene ${creator.container.id} store success`);
			})
			.catch((reason) => {
				console.warn(`scene ${creator.container.id} reason store fail:${reason} `);
			});
	}

	deleteScene(containerId: string) {
		this.scene.where('id').equals(containerId).delete();
	}

	async get(id: string): Promise<SceneEntity | undefined> {
		return this.scene
			.where('id')
			.equals(id)
			.first()
			.then((value) => {
				return value;
			});
	}

	getAll(): PromiseExtended<Array<SceneEntity>> {
		return this.scene.toArray();
	}

	updateScene(creator: Creator) {
		const res = {
			script: {},
			camera: creator.camera.toJSON(),
			scene: this.filterScene(creator.scene),
			ts: dayjs().unix(),
			updateTime: dayjs().format(),
		};
		if (creator.onUpdate) {
			creator.onUpdate(JSON.stringify(res));
			return;
		}
		this.scene
			.where('id')
			.equals(creator.container.id)
			.modify(
				Object.assign(
					{
						ts: res.ts,
						updateTime: res.updateTime,
					},
					res,
				),
			);
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
