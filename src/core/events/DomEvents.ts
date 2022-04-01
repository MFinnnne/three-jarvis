import { Pane } from 'tweakpane';
import EventRegistry from '../EventRegistry';
import Constant from '../../constant/Constant';
import objectChanged from '../ObjectChanged';
import state from '../State';
import ObjectControlPane from '../../app/ObjectControlPane';
import Ticker from '../Ticker';

export function domClickEvent(): void {
    let instance: Pane;

    EventRegistry.registry('objectDomClick', (value) => {
        instance && instance.dispose();
        const id = value[0];
        state.selectedObjectDom = document.getElementById(id) ?? document.createElement('div');
        const obj = Constant.SCENE.getObjectByProperty('uuid', id);
        if (!obj) {
            throw new Error(`object3d(uuid:${id}) is not in scene`);
        }
        objectChanged.highLightMesh(obj);
        instance = new ObjectControlPane().genPane(obj);
    });
}

export function domDoubleClickEvent(): void {
    Constant.LEFT_SIDE_BAR_CONTAINER.addEventListener('dblclick', (e) => {
        const element = e.target as HTMLElement;
        const id = element.id;
        if (id) {
            Ticker.emmit('objectDomDoubleClick', id);
        }
    });

    EventRegistry.registry('objectDomDoubleClick', (value) => {
        const id = value[0];
        const obj = Constant.SCENE.getObjectByProperty('uuid', id);
        if (!obj) {
            throw new Error(`object3d(uuid:${id}) is not in scene`);
        }
        objectChanged.highLightMesh(obj);
        Ticker.emmit('objectDoubleClick', obj);
    });
}
