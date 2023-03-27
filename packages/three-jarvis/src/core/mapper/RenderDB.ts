import Dexie, { Table } from 'dexie';

export type RenderEntity = {
    id: string;
    ts: number;
    updateTime: string;
    antialias: boolean;
    outputEncoding: number;
    gammaOutput: boolean;
    gammaFactor: number;
};

class RenderDB extends Dexie {
    private render!: Table<RenderEntity, string>;

    public constructor() {
        super('SceneDB');
        this.version(1).stores({
            scene: '&id,ts,updateTime,antialias,outputEncoding,gammaOutput,gammaFactor',
        });
    }

    insert(renderConfig: RenderEntity) {
        this.render.add(renderConfig, renderConfig.id);
    }

    update(renderConfig: RenderEntity) {
        this.render.where('id').equals(renderConfig.id).modify(renderConfig);
    }

    deleteById(id: string) {
        this.render.where('id').equals(id).delete();
    }
}

const renderDB = new RenderDB();
export default renderDB;
