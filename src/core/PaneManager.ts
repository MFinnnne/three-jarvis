import ObjectControlPane from '../app/pane/ObjectControlPane';
import HemisphereLightControlPane from '../app/pane/HemisphereLightControlPane';
import PointLightControlPane from '../app/pane/PointLightControlPane';
import DirectionalLightControlPane from '../app/pane/DirectionalLightControlPane';
import {Object3D} from 'three';
import {Pane} from 'tweakpane';
import {ControlPane} from "../app/pane/DefaultControlPane";
import CameraControlPane from "../app/pane/CameraControlPane";
import Jarvis from "./Jarvis";

const OBJECT_PANE_MAP: Map<string, () => ControlPane> = new Map();



export default class PaneManager {
    private static INSTANCE: Pane | null | undefined;
    private static CONTROL_PANE: ControlPane | undefined;

    static init(jarvis:Jarvis){
        OBJECT_PANE_MAP.set('Sprite', () => new ObjectControlPane(jarvis));
        OBJECT_PANE_MAP.set('Points', () => new ObjectControlPane(jarvis));
        OBJECT_PANE_MAP.set('Group', () => new ObjectControlPane(jarvis));
        OBJECT_PANE_MAP.set('Object3D', () => new ObjectControlPane(jarvis));
        OBJECT_PANE_MAP.set('Mesh', () => new ObjectControlPane(jarvis));

        OBJECT_PANE_MAP.set('PointLightHelper', () => new ObjectControlPane(jarvis));
        OBJECT_PANE_MAP.set('HemisphereLight', () => new HemisphereLightControlPane(jarvis));
        OBJECT_PANE_MAP.set('PointLight', () => new PointLightControlPane(jarvis));
        OBJECT_PANE_MAP.set('DirectionalLight', () => new DirectionalLightControlPane(jarvis));
        OBJECT_PANE_MAP.set('PerspectiveCamera', () => new CameraControlPane(jarvis));
    }

    static render(obj: Object3D) {
        PaneManager.INSTANCE?.dispose();
        PaneManager.INSTANCE = null;
        PaneManager.CONTROL_PANE = OBJECT_PANE_MAP.get(obj.type)?.apply(null);
        if (PaneManager.CONTROL_PANE) {
            PaneManager.INSTANCE = PaneManager.CONTROL_PANE.genPane(obj)
        }
        if (PaneManager.INSTANCE === undefined) {
            console.log(`${obj.type} pane is not supported`);
        }
    }

    static update() {
       PaneManager.CONTROL_PANE?.update();
    }
}
