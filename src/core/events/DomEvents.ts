import EventRegistry from '../EventRegistry';
import Constant from '../../constant/Constant';
import objectChanged from '../ObjectChanged';
import state from '../State';
import Ticker from '../Ticker';
import ObjectTree from '../../app/ObjectTree';
import PaneManager from '../PaneManager';

export function domClickEvent(): void {
    EventRegistry.registry('objectDomClick', (value) => {
        const id = value[0];
        const element = document.getElementById(id);
        if (element === null) {
            throw new Error(`html element (uuid:${id}) is not exist`);
        }
        state.selectedObjectDom.classList.toggle('selected');
        state.selectedObjectDom = element;
        element.classList.toggle('selected');
        const obj = Constant.rawVar.scene.getObjectByProperty('uuid', id);
        if (!obj) {
            throw new Error(`object3d(uuid:${id}) is not in scene`);
        }
        ObjectTree.autoLocateInTree(element);
        objectChanged.objectHelper(obj);
        PaneManager.render(obj);
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
        const obj = Constant.rawVar.scene.getObjectByProperty('uuid', id);
        if (!obj) {
            throw new Error(`object3d(uuid:${id}) is not in scene`);
        }
        objectChanged.objectHelper(obj);
        Ticker.emmit('objectDoubleClick', obj);
    });
}
