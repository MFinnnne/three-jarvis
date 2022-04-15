import {Pane} from 'tweakpane';
import EventRegistry from '../EventRegistry';
import Constant from '../../constant/Constant';
import objectChanged from '../ObjectChanged';
import state from '../State';
import ObjectControlPane from '../../app/pane/ObjectControlPane';
import Ticker from '../Ticker';
import {Object3DTree} from '../../app/Object3DTree';
import HemisphereLightControlPane from '../../app/pane/HemisphereLightControlPane';
import DirectionalLightControlPane from '../../app/pane/DirectionalLightControlPane';
import PointLightControlPane from '../../app/pane/PointLightControlPane';

export function domClickEvent(): void {
    let instance: Pane | null = null;

    EventRegistry.registry('objectDomClick', (value) => {
        const id = value[0];
        const element = document.getElementById(id);
        if (element === null) {
            throw new Error(`html element (uuid:${id}) is not exist`);
        }

        state.selectedObjectDom.classList.toggle('selected');
        state.selectedObjectDom = element;
        element.classList.toggle('selected');
        const obj = Constant.SCENE.getObjectByProperty('uuid', id);

        if (!obj) {
            throw new Error(`object3d(uuid:${id}) is not in scene`);
        }
        Object3DTree.autoLocateInTree(element);
        objectChanged.objectHelper(obj);
        instance?.dispose();
        instance = null;
        switch (obj.type) {
            case 'Points':
            case 'Sprite':
            case 'Group':
            case 'Mesh':
                instance = new ObjectControlPane().genPane(obj);
                break;
            case 'HemisphereLight':
                instance = new HemisphereLightControlPane().genPane(obj);
                break;
            case 'PointLight':
                instance = new PointLightControlPane().genPane(obj);
                break;
            case 'DirectionalLight':
                instance = new DirectionalLightControlPane().genPane(obj);
                break;
            default:
                console.log(`${obj.type} pane is not supported`);
                break;
        }
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
        objectChanged.objectHelper(obj);
        Ticker.emmit('objectDoubleClick', obj);
    });
}
