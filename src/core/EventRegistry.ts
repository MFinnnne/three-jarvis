import Ticker from './Ticker';
import {Events} from '../types/types';
import {Unsubscribe} from 'nanoevents';
import ObjectControlPane from '../app/ObjectControlPane';
import Constant from '../constant/Constant';
import {highLightMesh} from '../util/ObjectUtil';
import {Pane} from "tweakpane";

const EVENTS_UNBIND_MAP: Map<keyof Events, Unsubscribe> = new Map();
let pane: Pane;

export default class EventRegistry {
    static registry() {
        EVENTS_UNBIND_MAP.set(
            'objectDomClick',
            Ticker.on('objectDomClick', (value) => {
                pane && pane.dispose();
                const id = value[0];
                const obj = Constant.SCENE.getObjectByProperty('uuid', id);
                if (!obj) {
                    throw new Error(`object3d ===${id}=== is not in scene`);
                }
                highLightMesh(obj);
                pane = new ObjectControlPane().genPane(obj);
            }),
        );

        EVENTS_UNBIND_MAP.set(
            'objectClick',
            Ticker.on('objectClick', (id) => {
                console.log(id);
            }),
        );
    }

    static unRegistry(eventName: keyof Events) {
        EVENTS_UNBIND_MAP.get(eventName)?.();
    }
}
