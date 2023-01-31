import {Camera, Object3D, WebGLRenderer} from 'three';
import {BladeApi, Pane} from 'tweakpane';
import * as TweakpaneRotationInputPlugin from '@0b5vr/tweakpane-plugin-rotation';
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';

import General from "../../core/General";

export type ControlPane = {
    genPane(argument: Object3D | Camera | WebGLRenderer): Pane;

    update(): void;
};

export default class DefaultControlPane implements ControlPane {
    protected general: General;
    protected pane: Pane;
    private _bindMap: Map<string, BladeApi<any>> = new Map<string, BladeApi<any>>();
    constructor(general: General) {
        this.general = general;
        this.pane = new Pane({container: this.general.paneContainer});
    }


    genPane(argument?: Object3D | Camera | WebGLRenderer): Pane {
        this.pane.registerPlugin(TweakpaneRotationInputPlugin);
        this.pane.registerPlugin(EssentialsPlugin);

        return this.pane;
    }

    update(): void {}

    get bindMap(): Map<string, BladeApi<any>> {
        return this._bindMap;
    }
}
