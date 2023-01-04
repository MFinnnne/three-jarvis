import { Camera, Object3D, WebGLRenderer } from "three";
import { BladeApi, Pane } from "tweakpane";
import Constant from "../../constant/Constant";
import * as TweakpaneRotationInputPlugin from "@0b5vr/tweakpane-plugin-rotation";
import * as EssentialsPlugin from "@tweakpane/plugin-essentials";
import Jarvis from "../../core/Jarvis";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

export interface ControlPane {


    genPane(argument: Object3D | Camera | WebGLRenderer): Pane;

    update(): void;
}

export default class DefaultControlPane implements ControlPane {
    protected jarvis:Jarvis;
    constructor(creator: Jarvis) {
        this.jarvis = creator;
    }

    protected pane: Pane = new Pane({ container: Constant.PANE_CONTAINER});
    private _bindMap: Map<string, BladeApi<any>> = new Map<string, BladeApi<any>>();

    genPane(argument?: Object3D | Camera | WebGLRenderer): Pane {
        this.pane.registerPlugin(TweakpaneRotationInputPlugin);
        this.pane.registerPlugin(EssentialsPlugin);

        return this.pane;
    }

    update(): void {
    }


    get bindMap(): Map<string, BladeApi<any>> {
        return this._bindMap;
    }

    set bindMap(value: Map<string, BladeApi<any>>) {
        this._bindMap = value;
    }
}
