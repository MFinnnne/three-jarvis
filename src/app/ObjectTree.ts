import {Object3D} from "three";

/**
 * Render the model dom nodes based on this structures
 */
export type ModelVDomData = {
    name: string
    uuid: string
    model: Object3D
    child: ModelVDomData[]
    parent?: ModelVDomData | null
}

/**
 * Generate a model tree
 */
export  class ObjectTree {

    private geneModelDataTree(model: Object3D): ModelVDomData {
        return {
            name: model.name,
            uuid: model.uuid,
            model: model,
            child: model.children.map(child => this.geneModelDataTree(child)) ?? [],
            parent: model.parent ? this.geneModelDataTree(model.parent) : null
        };
    }

}
