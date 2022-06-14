import {ControlPane} from '../types/types';
import {Camera, Object3D, WebGLRenderer} from 'three';
import {BladeApi, Pane} from 'tweakpane';
import Constant from '../constant/Constant';
import {BladeController} from "@tweakpane/core/src/blade/common/controller/blade";
import {View} from "@tweakpane/core/src/common/view/view";

export default class DefaultControlPane implements ControlPane {
    protected pane: Pane = new Pane({container: Constant.PANE_CONTAINER, title: 'three-helper'});
    protected bindMap: Map<String, BladeApi<any>> = new Map<String, BladeApi<any>>()

    genPane(argument: Object3D | Camera | WebGLRenderer): Pane {
        return this.pane;
    }
}
