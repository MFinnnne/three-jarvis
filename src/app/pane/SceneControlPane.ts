import ObjectControlPane from './ObjectControlPane';
import {Pane} from 'tweakpane';
import {Object3D, Scene} from 'three';
import General from "../../core/General";

export default class SceneControlPane extends ObjectControlPane {
    object!: Scene;

    constructor(general: General) {
        super(general);
    }

    genPane(argument: Object3D): Pane {
        const pane = super.genPane(argument);
        this.object = argument as Scene;
        pane.title = 'scene';

        return pane;
    }

    update() {
        super.update();
    }
}
