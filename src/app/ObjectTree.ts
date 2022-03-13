/**
 * Render the model dom nodes based on this structures
 */
type ModelDom = {
    name: string
    uuid: string
    child?: ModelDom[]
    parent?: ModelDom
}

/**
 * Generate a model tree
 */
export default class ObjectTree {
}
