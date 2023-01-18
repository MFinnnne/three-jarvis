import ObjectEventBus from "./ObjectEventBus";

export default class Creator {
    constructor() {
    }

    public subscribeByUUID(uuid: string): Notify {
        const eventBus = new ObjectEventBus('uuid', uuid);
        return new Notify(eventBus, this);
    }

    public render(): void {

    }
}

class Notify {
    private readonly _bus: ObjectEventBus;
    private readonly _creator: Creator;

    constructor(bus: ObjectEventBus, creator: Creator) {
        this._bus = bus;
        this._creator = creator;
    }

    public on(callBack: (bus: ObjectEventBus) => void) {
        callBack(this._bus);
        return this._creator;
    }
}
new Creator()
    .subscribeByUUID('123').on(res=>{})
    .subscribeByUUID("456").on(res=>{})
    .render();
