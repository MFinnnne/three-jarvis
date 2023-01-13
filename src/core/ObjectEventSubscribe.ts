import Jarvis from "./Jarvis";
import ObjectEventDispatch from "./ObjectEventDispatch";

export default class ObjectEventSubscribe {
    private _jarvis: Jarvis;

    constructor(jarvis: Jarvis) {
        this._jarvis = jarvis;
    }

    public subscribe(uuid: string) {
        const obj = this._jarvis.scene.getObjectByProperty('uuid', uuid);
        if (obj) {
            return new ObjectEventDispatch(obj);
        }
        console.error(`can not find a uuid for ${uuid} object in scene`);
    }
}
