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
    PointLightHelper,
    Scene,
} from 'three';
import { OBJECT_TREE_BLACK_LIST } from '../config/Config';

type helperFns = (object: Object3D, color?: ColorRepresentation) => Object3D | null | void;
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
    highLightBox = new BoxHelper(object, color);
    highLightBox.layers.set(1);
    highLightBox.name = 'BoxHelper_' + object.id;
    highLightBox.setFromObject(object);
    highLightBox.update(object);
    return highLightBox;
};

const cameraHelperFn = (camera: Camera): CameraHelper | null => {
    if (cameraHelper != null) {
        cameraHelper.dispose();
        cameraHelper.removeFromParent();
    }
    cameraHelper = new CameraHelper(camera);
    cameraHelper.layers.set(3);
    return cameraHelper;
};

const lightHelperFn = (object, color = 0xffff00): Object3D | null => {
    let lightObject: PointLight | HemisphereLight | DirectionalLight | null = null;
    let name = '';
    switch (object.type) {
        case 'DirectionalLight':
            lightObject = object as DirectionalLight;
            if (dLightHelper == null) {
                dLightHelper = new DirectionalLightHelper(lightObject, 5, color);
            }
            lightHelper = dLightHelper;
            name = 'DirectionalLight';
            break;
        case 'PointLight':
            lightObject = object as PointLight;
            if (pLightHelper == null) {
                pLightHelper = new PointLightHelper(lightObject, 5, color);
            }
            lightHelper = pLightHelper;
            name = 'PointLight';
            break;
        case 'HemisphereLight':
            lightObject = object as HemisphereLight;
            if (hLightHelper == null) {
                hLightHelper = new HemisphereLightHelper(lightObject, 5, color);
            }
            lightHelper = hLightHelper;
            name = 'HemisphereLight';
            break;
        default:
            break;
    }
    if (lightHelper && lightObject) {
        lightHelper.visible = true;
        lightHelper.light = lightObject;
        lightHelper.update();
        lightHelper.name = name + '_' + lightObject.uuid;
        return lightHelper;
    }
    return null;
};

//light helper
OBJECT_HELPER_MAP.set('HemisphereLight', [(object) => lightHelperFn(object)]);
OBJECT_HELPER_MAP.set('PointLight', [(object) => lightHelperFn(object)]);
OBJECT_HELPER_MAP.set('DirectionalLight', [(object) => lightHelperFn(object)]);
OBJECT_HELPER_MAP.set('PerspectiveCamera', [(object, color) => cameraHelperFn(object as Camera)]);
OBJECT_HELPER_MAP.set('Group', [(object, color) => boxHelperFn(object)]);
OBJECT_HELPER_MAP.set('Object3D', [(object, color) => boxHelperFn(object)]);
OBJECT_HELPER_MAP.set('Mesh', [(object, color) => boxHelperFn(object)]);

export default class HelperManager {
    static render(object: Object3D, scene: Scene): void {
        helpers.forEach((helper) => {
            helper.visible = false;
        });
        if (!OBJECT_HELPER_MAP.has(object.type)) {
            return;
        }
        const fn = OBJECT_HELPER_MAP.get(object.type);
        const fns: Array<helperFns> = [];
        if (fn !== undefined) {
            if (!(fn instanceof Array)) {
                fns.push(fn);
            } else {
                fns.push(...fn);
            }
        }
        fns.forEach((item) => {
            const helper = item?.(object);
            if (helper) {
                if (helpers.find((item) => item.uuid === helper.uuid)) {
                    return;
                }
                OBJECT_TREE_BLACK_LIST.push(helper.uuid);
                helpers.push(helper);
                scene.add(helper);
            }
        });
    }
}
