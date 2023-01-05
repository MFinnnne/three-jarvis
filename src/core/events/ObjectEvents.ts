import EventRegistry from "../EventRegistry";
import { Group, Object3D, Raycaster, Vector2 } from "three";
import { Intersection } from "three/src/core/Raycaster";
import ObjectChanged from "../ObjectChanged";
import Ticker from "../Ticker";
import state from "../State";
import ObjectTree from "../../app/ObjectTree";
import Jarvis from "../Jarvis";

const threeJarvisRayCaster = new Raycaster();
threeJarvisRayCaster.layers.enable(1);
function intersectObjects(jarvis:Jarvis, e: MouseEvent, rayCaster: Raycaster, target: Object3D[] | Group[]): Intersection[] {

    const mouse = new Vector2();
    mouse.x = ((e.clientX - jarvis.container.offsetLeft) / jarvis.container.clientWidth) * 2 - 1;
    mouse.y = -((e.clientY - jarvis.container.offsetTop) / jarvis.container.clientHeight) * 2 + 1;
    rayCaster.setFromCamera(mouse, jarvis.state.activeCamera);
    return rayCaster.intersectObjects(target, true);
}


export function rayCasterEvents(creator: Jarvis) {
    creator.container.addEventListener("click", (e) => {
        const intersects = intersectObjects(creator, e, threeJarvisRayCaster, creator.scene.children);
        if (intersects.length > 0) {
            if (e.altKey) {
                Ticker.emmit("objectClick", intersects[0].object);
            }
        }
    });

    creator.container.addEventListener("dblclick", (e) => {
        const intersects = intersectObjects(creator,e, threeJarvisRayCaster, creator.scene.children);
        if (intersects.length > 0) {
            const fistCatchObject = intersects[0].object;
            Ticker.emmit("objectClick", fistCatchObject);
            Ticker.emmit("objectDoubleClick", fistCatchObject);
        }
    });
}

export function clickObjectEvent(objectTree: ObjectTree): void {
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
        objectTree.expandTreeByChildNode(dom);
        ObjectChanged.getInstance().objectHelper(object);
        Ticker.emmit("objectDomClick", object.uuid);
    });
}

export function objectDoubleClickEvent(): void {
    EventRegistry.registry("objectDoubleClick", (value) => {
        // MyCameraUtil.faceObject(value[0]);
    });
}
