import EventRegistry from '../EventRegistry';
import {Object3D, Raycaster, Vector2} from 'three';
import Constant from '../../constant/Constant';
import {Intersection} from 'three/src/core/Raycaster';
import objectChanged from '../ObjectChanged';
import Ticker from '../Ticker';
import {Object3DTree} from "../../app/Object3DTree";

const threeHelperRayCaster = new Raycaster();
threeHelperRayCaster.layers.enableAll();

export function rayCasterEvents() {
    let renderDom = Constant.THREE_CONTAINER;
    if (renderDom === undefined) {
        throw new Error("can not get threejs renderer dom")
    }
    window.addEventListener('click', (e) => {
        const mouse = new Vector2();
        mouse.x = ((e.clientX - renderDom.offsetLeft) / renderDom.clientWidth) * 2 - 1;
        mouse.y = -((e.clientY - renderDom.offsetTop) / renderDom.clientHeight) * 2 + 1;
        threeHelperRayCaster.setFromCamera(mouse, Constant.CAMERA);
        const intersects = threeHelperRayCaster.intersectObjects(Constant.SCENE.children, true);
        if (intersects.length > 0) {
            const fistCatchObject = intersects[0].object;
            Ticker.emmit('objectClick', fistCatchObject);
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
        Object3DTree.expandTreeByChildNode(dom)
        objectChanged.highLightMesh(object);
        Ticker.emmit('objectDomClick', object.uuid);
    });
}
