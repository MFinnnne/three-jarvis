import {ControlPane} from "../types/types";
import {Camera, Object3D, WebGLRenderer} from "three";
import {Pane} from "tweakpane";
import Constant from "../constant/Constant";

export default  class DefaultControlPane implements ControlPane {

    protected pane: Pane = new Pane({container:Constant.PANE_CONTAINER});

    genPane(argument: Object3D | Camera | WebGLRenderer): Pane {
        return this.pane;
    }

}
