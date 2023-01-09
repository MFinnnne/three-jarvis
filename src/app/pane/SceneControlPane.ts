import ObjectControlPane from './ObjectControlPane';
import Jarvis from '../../core/Jarvis';
import { Pane } from 'tweakpane';
import { Color, Object3D, Scene } from 'three';

export default class SceneControlPane extends ObjectControlPane {
    object!: Scene;

    constructor(jarvis: Jarvis) {
        super(jarvis);
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
