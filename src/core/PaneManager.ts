import ObjectControlPane from '../app/pane/ObjectControlPane';
import HemisphereLightControlPane from '../app/pane/HemisphereLightControlPane';
import PointLightControlPane from '../app/pane/PointLightControlPane';
import DirectionalLightControlPane from '../app/pane/DirectionalLightControlPane';
import {Object3D} from 'three';
import {Pane} from 'tweakpane';
import {ControlPane} from "../app/pane/DefaultControlPane";

const OBJECT_PANE_MAP: Map<string, () => ControlPane> = new Map();

OBJECT_PANE_MAP.set('Sprite', () => new ObjectControlPane());
OBJECT_PANE_MAP.set('Points', () => new ObjectControlPane());
OBJECT_PANE_MAP.set('Group', () => new ObjectControlPane());
OBJECT_PANE_MAP.set('Object3D', () => new ObjectControlPane());
OBJECT_PANE_MAP.set('Mesh', () => new ObjectControlPane());

OBJECT_PANE_MAP.set('PointLightHelper', () => new ObjectControlPane());
OBJECT_PANE_MAP.set('HemisphereLight', () => new HemisphereLightControlPane());
OBJECT_PANE_MAP.set('PointLight', () => new PointLightControlPane());
OBJECT_PANE_MAP.set('DirectionalLight', () => new DirectionalLightControlPane());

export default class PaneManager {
    private static INSTANCE: Pane | null | undefined;
    private static CONTROL_PANE: ControlPane | undefined;

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
