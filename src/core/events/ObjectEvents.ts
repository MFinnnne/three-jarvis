import EventRegistry from "../EventRegistry";
import { Group, Object3D, Raycaster, Vector2 } from "three";
import Constant from "../../constant/Constant";
import { Intersection } from "three/src/core/Raycaster";
import objectChanged from "../ObjectChanged";
import Ticker from "../Ticker";
import state from "../State";
import ObjectTree from "../../app/ObjectTree";

const threeJarvisRayCaster = new Raycaster();

function intersectObjects(e: MouseEvent, rayCaster: Raycaster, target: Object3D[] | Group[]): Intersection[] {
    const renderDom = Constant.rawVar.render.domElement;
    if (renderDom === undefined) {
        throw new Error("can not get threejs renderer dom");
    }
    const mouse = new Vector2();
    mouse.x = ((e.clientX - renderDom.getBoundingClientRect().left) / renderDom.clientWidth) * 2 - 1;
    mouse.y = -((e.clientY - renderDom.getBoundingClientRect().top) / renderDom.clientHeight) * 2 + 1;
    rayCaster.setFromCamera(mouse, state.activeCamera);
    return rayCaster.intersectObjects(target, true);
}


export function rayCasterEvents() {
    Constant.rawVar.render.domElement.addEventListener("click", (e) => {
        const intersects = intersectObjects(e, threeJarvisRayCaster, Constant.rawVar.scene.children);
        if (intersects.length > 0) {
            if (e.altKey) {
                Ticker.emmit("objectClick", intersects[0].object);
            }
        }
    });

    Constant.rawVar.render.domElement.addEventListener("dblclick", (e) => {
        const intersects = intersectObjects(e, threeJarvisRayCaster, Constant.rawVar.scene.children);
        if (intersects.length > 0) {
            const fistCatchObject = intersects[0].object;
            Ticker.emmit("objectClick", fistCatchObject);
            Ticker.emmit("objectDoubleClick", fistCatchObject);
        }
    });
}

export function clickObjectEvent(): void {
    EventRegistry.registry("objectClick", (value) => {
        const object = value[0];
        const dom: HTMLElement | null = document.getElementById(object.uuid);
        if (object.type === "BoxHelper") {
            return;
        }
        if (dom === null) {
            console.log("not render object:", object);
            throw new Error(`object ===${object.uuid}===${object.name} dom is null`);
        }
        ObjectTree.expandTreeByChildNode(dom);
        objectChanged.objectHelper(object);
        Ticker.emmit("objectDomClick", object.uuid);
    });
}

export function objectDoubleClickEvent(): void {
    EventRegistry.registry("objectDoubleClick", (value) => {
        // MyCameraUtil.faceObject(value[0]);
    });
}
