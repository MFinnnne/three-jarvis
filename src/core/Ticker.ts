import { createNanoEvents, Emitter } from 'nanoevents';
import {Events} from "./Type";

export default class Ticker {
    private static readonly EMITTER: Emitter = createNanoEvents<Events>();

    static on<E extends keyof Events>(event: E, callback: Events[E]) {
        return Ticker.EMITTER.on(event, callback);
    }

    static emmit<E extends keyof Events>(event: E, ...args: Parameters<Events[E]>) {
        return Ticker.EMITTER.emit(event, args);
    }
}
