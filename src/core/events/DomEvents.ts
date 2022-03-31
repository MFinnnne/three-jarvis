import { Pane } from 'tweakpane';
import EventRegistry from '../EventRegistry';
import Constant from '../../constant/Constant';
import objectChanged from '../ObjectChanged';
import state from '../State';
import ObjectControlPane from '../../app/ObjectControlPane';

export function domClickEvent(): void {
    let instance: Pane;
    EventRegistry.registry('objectDomClick', (value => {
        instance && instance.dispose();
        const id = value[0];
        const obj = Constant.SCENE.getObjectByProperty('uuid', id);
        if (!obj) {
            throw new Error(`object3d(uuid:${id}) is not in scene`);
        }
        objectChanged.highLightMesh(obj);
        instance = new ObjectControlPane().genPane(obj);
    }));
}

