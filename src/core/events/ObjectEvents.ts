import EventRegistry from '../EventRegistry';
import { Object3D, Raycaster, Vector2 } from 'three';
import Constant from '../../constant/Constant';
import { Intersection } from 'three/src/core/Raycaster';
import objectChanged from '../ObjectChanged';
import Ticker from '../Ticker';

const threeHelperRayCaster = new Raycaster();
let intersects: Intersection<Object3D<Event>>[] = [];

window.addEventListener('click', (e: MouseEvent) => {
    const mouse = new Vector2();
    const dom = Constant.RENDERER.domElement;
    mouse.x = ((e.clientX - dom.offsetLeft) / dom.clientWidth) * 2 - 1;
    mouse.y = -((e.clientY - dom.offsetTop) / dom.clientHeight) * 2 + 1;
    threeHelperRayCaster.setFromCamera(mouse, Constant.CAMERA);
    intersects = threeHelperRayCaster.intersectObjects(Constant.SCENE.children, true);
    if (intersects.length > 0) {
        const fistCatchObject = intersects[0].object;
        Ticker.emmit('objectClick', fistCatchObject);
    }
});

export function clickObjectEvent(): void {
    EventRegistry.registry('objectClick', (value) => {
        const object = value[0];
        const dom = document.getElementById(object.uuid);
        if (dom === null) {
            throw new Error(`object ===${object.uuid}=== dom is null`);
        }
        let element = dom.parentElement;
        while (element && element.className !== 'three-helper-container') {
            const firstChild = element.children[0] as HTMLElement;
            firstChild.click();
            element = element.parentElement;
        }
        objectChanged.highLightMesh(object);
    });
}
