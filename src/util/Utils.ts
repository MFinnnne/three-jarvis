import { Object3D } from 'three';

export default class Utils {
    static removeAllChildNodes(parent): void {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    static countAllModels(model: Object3D): number {
        let length = 1;
        for (const child of model.children) {
            length += Utils.countAllModels(child);
        }
        return length;
    }
}
