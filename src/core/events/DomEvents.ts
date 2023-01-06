import EventRegistry from '../EventRegistry';
import Ticker from '../Ticker';
import PaneManager from '../PaneManager';
import { Scene } from 'three';
import ObjectChanged from '../ObjectChanged';

export function domClickEvent(scene: Scene): void {
    EventRegistry.registry('objectDomClick', (value) => {
        const id = value[0];
        const obj = scene.getObjectByProperty('uuid', id);
        if (!obj) {
            throw new Error(`object3d(uuid:${id}) is not in scene`);
        }
        ObjectChanged.getInstance().objectHelper(obj);
        PaneManager.render(obj);
    });
}

export function domDoubleClickEvent(node: HTMLElement, scene: Scene): void {
    node.addEventListener('dblclick', (e) => {
        const element = e.target as HTMLElement;
        const id = element.id;
        if (id) {
            Ticker.emmit('objectDomDoubleClick', id);
        }
    });

    EventRegistry.registry('objectDomDoubleClick', (value) => {
        const id = value[0];
        const obj = scene.getObjectByProperty('uuid', id);
        if (!obj) {
            throw new Error(`object3d(uuid:${id}) is not in scene`);
        }
        ObjectChanged.getInstance().objectHelper(obj);
        Ticker.emmit('objectDoubleClick', obj);
    });
}
