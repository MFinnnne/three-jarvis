import EventRegistry from '../EventRegistry';
import {Group, Object3D, Raycaster, Vector2} from 'three';
import {Intersection} from 'three/src/core/Raycaster';
import ObjectChanged from '../ObjectChanged';
import Ticker from '../Ticker';
import ObjectTree from '../../app/ObjectTree';
import General from "../General";

const threeJarvisRayCaster = new Raycaster();
function intersectObjects(
    general: General,
    e: MouseEvent,
    rayCaster: Raycaster,
    target: Object3D[] | Group[],
): Intersection[] {
    const mouse = new Vector2();
    mouse.x = ((e.clientX - general.container.offsetLeft) / general.container.clientWidth) * 2 - 1;
    mouse.y = -((e.clientY - general.container.offsetTop) / general.container.clientHeight) * 2 + 1;
    rayCaster.setFromCamera(mouse, general.state.activeCamera);
    return rayCaster.intersectObjects(target, true);
}

export function rayCasterEvents(general: General) {
    general.container.addEventListener('click', (e) => {
        const intersects = intersectObjects(general, e, threeJarvisRayCaster, general.scene.children);
        if (intersects.length > 0) {
            if (e.altKey) {
                Ticker.emmit('objectClick', intersects[0].object);
            }
        }
    });

    general.container.addEventListener('dblclick', (e) => {
        const intersects = intersectObjects(general, e, threeJarvisRayCaster, general.scene.children);
        if (intersects.length > 0) {
            const fistCatchObject = intersects[0].object;
            Ticker.emmit('objectClick', fistCatchObject);
            Ticker.emmit('objectDoubleClick', fistCatchObject);
        }
    });
}

export function clickObjectEvent(objectTree: ObjectTree): void {
    EventRegistry.registry('objectClick', (value) => {
        const object = value[0];
        const dom: HTMLElement | null = document.getElementById(object.uuid);
        if (object.type === 'BoxHelper') {
            return;
        }
        if (dom === null) {
            console.log('not render object:', object);
            throw new Error(`object ===${object.uuid}===${object.name} dom is null`);
        }
        objectTree.expandTreeByChildNode(dom);
        ObjectChanged.getInstance().objectHelper(object);
        Ticker.emmit('objectDomClick', object.uuid);
    });
}

export function objectDoubleClickEvent(): void {
    EventRegistry.registry('objectDoubleClick', (value) => {
        // MyCameraUtil.faceObject(value[0]);
    });
}
