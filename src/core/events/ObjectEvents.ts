import EventRegistry from '../EventRegistry';
import { Raycaster, Vector2 } from 'three';
import Constant from '../../constant/Constant';
import { Intersection } from 'three/src/core/Raycaster';
import objectChanged from '../ObjectChanged';
import Ticker from '../Ticker';
import { Object3DTree } from '../../app/Object3DTree';
import MyCameraUtil from '../../util/MyCameraUtil';
import state from '../State';

const threeHelperRayCaster = new Raycaster();
threeHelperRayCaster.layers.mask = 0xfffffffe | 1;

function intersectObjects(e: MouseEvent): Intersection[] {
    const renderDom = Constant.THREE_CONTAINER;
    if (renderDom === undefined) {
        throw new Error('can not get threejs renderer dom');
    }
    const mouse = new Vector2();
    mouse.x = ((e.clientX - renderDom.offsetLeft) / renderDom.clientWidth) * 2 - 1;
    mouse.y = -((e.clientY - renderDom.offsetTop) / renderDom.clientHeight) * 2 + 1;
    threeHelperRayCaster.setFromCamera(mouse, state.activeCamera);
    return threeHelperRayCaster.intersectObjects(Constant.SCENE.children, true);
}

export function rayCasterEvents() {
    Constant.THREE_CONTAINER.addEventListener('click', (e) => {
        const intersects = intersectObjects(e);
        if (intersects.length > 0) {
            const fistCatchObject = intersects[0].object;
            if (e.altKey) {
                Ticker.emmit('objectClick', fistCatchObject);
            }
        }
    });

    Constant.THREE_CONTAINER.addEventListener('dblclick', (e) => {
        const intersects = intersectObjects(e);
        if (intersects.length > 0) {
            const fistCatchObject = intersects[0].object;
            Ticker.emmit('objectClick', fistCatchObject);
            Ticker.emmit('objectDoubleClick', fistCatchObject);
        }
    });
}

export function clickObjectEvent(): void {
    EventRegistry.registry('objectClick', (value) => {
        const object = value[0];
        const dom: HTMLElement | null = document.getElementById(object.uuid);
        if (object.type === 'BoxHelper') {
            return;
        }
        if (dom === null) {
            throw new Error(`object ===${object.uuid}=== dom is null`);
        }
        Object3DTree.expandTreeByChildNode(dom);
        objectChanged.objectHelper(object);
        Ticker.emmit('objectDomClick', object.uuid);
    });
}

export function objectDoubleClickEvent(): void {
    EventRegistry.registry('objectDoubleClick', (value) => {
        MyCameraUtil.faceObject(value[0]);
    });
}
