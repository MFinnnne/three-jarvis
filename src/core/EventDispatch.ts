export default class EventDispatch {
    private _id: string;
    private uuidSet: Set<string> = new Set<string>();

    constructor(id: string) {
        this._id = id;
    }

    onAfterAdd(uuid: string, callback: () => void) {
        if (!this.uuidSet.has(uuid)) {
            this.uuidSet.add(uuid);
        }
    }

    onBeforeRender(uuid: string, callback: () => void) {
        if (!this.uuidSet.has(uuid)) {
            this.uuidSet.add(uuid);
        }
    }

    onAfterRender(uuid: string, callback: () => void) {
        if (!this.uuidSet.has(uuid)) {
            this.uuidSet.add(uuid);
        }
    }
}
