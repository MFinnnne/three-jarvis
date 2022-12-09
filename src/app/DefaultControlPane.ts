import {Camera, Object3D, WebGLRenderer} from 'three';
import {BladeApi, Pane} from 'tweakpane';
import Constant from '../constant/Constant';

export interface ControlPane {
    genPane(argument: Object3D | Camera | WebGLRenderer): Pane;

    update(): void;
}
export default class DefaultControlPane implements ControlPane {
    protected pane: Pane = new Pane({container: Constant.PANE_CONTAINER, title: 'three-helper'});
    private _bindMap: Map<string, BladeApi<any>> = new Map<string, BladeApi<any>>()

    genPane(argument: Object3D | Camera | WebGLRenderer): Pane {
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
