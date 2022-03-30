import Ticker from './Ticker';
import { Events } from '../types/types';
import { Unsubscribe } from 'nanoevents';
import { Pane } from 'tweakpane';

const EVENTS_UNBIND_MAP: Map<keyof Events, Unsubscribe> = new Map();

export default class EventRegistry {

    static registry<E extends keyof Events>(event: E, callback: Events[E]) {
        EVENTS_UNBIND_MAP.set(event, Ticker.on(event, callback));
    }

    static unRegistry(eventName: keyof Events) {
        EVENTS_UNBIND_MAP.get(eventName)?.();
    }
}
