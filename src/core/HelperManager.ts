import {
    BoxHelper,
    Camera,
    CameraHelper,
    ColorRepresentation,
    DirectionalLight,
    DirectionalLightHelper,
    HemisphereLight,
    HemisphereLightHelper,
    Object3D,
    PointLight,
    PointLightHelper
} from "three";
import Constant from "../constant/Constant";
import { OBJECT_TREE_BLACK_LIST } from "../config/Config";
import TransformControlComponent from "./component/TransformControlComponent";

type helperFns = (object: Object3D, color?: ColorRepresentation) => Object3D | null | void
const OBJECT_HELPER_MAP: Map<string, helperFns[] | helperFns> = new Map();

let highLightBox: BoxHelper | null = null;
let lightHelper: PointLightHelper | HemisphereLightHelper | DirectionalLightHelper | null = null;
const helpers: Array<Object3D> = [];
let dLightHelper: DirectionalLightHelper | null = null;
let hLightHelper: HemisphereLightHelper | null = null;
let pLightHelper: PointLightHelper | null = null;
// init camera helper
let cameraHelper: CameraHelper | null = null;

const boxHelperFn = (object, color = 0xffff00): Object3D | null => {
    if (highLightBox) {
        highLightBox.visible = true;
        highLightBox.setFromObject(object);
        highLightBox.update();
        return null;
    }
    highLightBox = new BoxHelper(Constant.rawVar.scene, color);
    highLightBox.layers.mask = 0x00000001 | 1;
    highLightBox.name = "BoxHelper_" + Constant.HELPER_NAME;
    highLightBox.setFromObject(object);
    highLightBox.update(object);
    return highLightBox;
};


const transformControlFn = (object: Object3D): void => {
    TransformControlComponent.CONTROLS.attach(object);
};

const cameraHelperFn = (camera: Camera): CameraHelper | null => {
    if (cameraHelper == null) {
        cameraHelper = new CameraHelper(camera);
        return cameraHelper;
    }
    cameraHelper.camera = camera;
    return null;
};

const lightHelperFn = (object, color = 0xffff00): Object3D | null => {
    let lightObject: PointLight | HemisphereLight | DirectionalLight | null = null;
    let name = "";
    switch (object.type) {
        case "DirectionalLight":
            lightObject = object as DirectionalLight;
            if (dLightHelper == null) {
                dLightHelper = new DirectionalLightHelper(lightObject, 5, color);
            }
            lightHelper = dLightHelper;
            name = "DirectionalLight";
            break;
        case "PointLight":
            lightObject = object as PointLight;
            if (pLightHelper == null) {
                pLightHelper = new PointLightHelper(lightObject, 5, color);
            }
            lightHelper = pLightHelper;
            name = "PointLight";
            break;
        case "HemisphereLight":
            lightObject = object as HemisphereLight;
            if (hLightHelper == null) {
                hLightHelper = new HemisphereLightHelper(lightObject, 5, color);
            }
            lightHelper = hLightHelper;
            name = "HemisphereLight";
            break;
        default:
            break;
    }
    if (lightHelper && lightObject) {
        lightHelper.visible = true;
        lightHelper.light = lightObject;
        lightHelper.update();
        lightHelper.name = name + "_" + Constant.HELPER_NAME;
        return lightHelper;
    }
    return null;
};

//light helper
OBJECT_HELPER_MAP.set("HemisphereLight", [(object) => lightHelperFn(object), (object, color) => transformControlFn(object)]);
OBJECT_HELPER_MAP.set("PointLight", [(object) => lightHelperFn(object), transformControlFn]);
OBJECT_HELPER_MAP.set("DirectionalLight", [(object) => lightHelperFn(object), transformControlFn]);
OBJECT_HELPER_MAP.set("PerspectiveCamera",
    [
        (object, color) => cameraHelperFn(object as Camera),
        (object, color) => transformControlFn(object)
    ]
);
OBJECT_HELPER_MAP.set("Group",
    [
        (object, color) => boxHelperFn(object),
        (object, color) => transformControlFn(object)
    ]
);
OBJECT_HELPER_MAP.set("Object3D",
    [
        (object, color) => boxHelperFn(object),
        (object, color) => transformControlFn(object)
    ]
);
OBJECT_HELPER_MAP.set("Mesh",
    [
        (object, color) => boxHelperFn(object),
        (object, color) => transformControlFn(object)
    ]
);

export default class HelperManager {
    static render(object: Object3D): void {
        helpers.forEach((helper) => {
            helper.visible = false;
        });
        if (!OBJECT_HELPER_MAP.has(object.type)) {
            return;
        }
        const fn = OBJECT_HELPER_MAP.get(object.type);
        let fns: Array<helperFns> = [];
        if (fn !== undefined) {
            if (!(fn instanceof Array)) {
                fns.push(fn);
            } else {
                fns.push(...fn);
            }
        }
        fns.forEach(item => {
            const helper = item?.(object);
            if (helper) {
                if (helpers.find((item) => item.uuid === helper.uuid)) {
                    return;
                }
                OBJECT_TREE_BLACK_LIST.push(helper.uuid);
                helpers.push(helper);
                Constant.rawVar.scene.add(helper);
            }
        });
    }
}
