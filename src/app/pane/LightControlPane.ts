import ObjectControlPane from './ObjectControlPane';
import { Light, Object3D } from 'three';
import { Pane } from 'tweakpane';
import General from '../../core/General';

export default class LightControlPane extends ObjectControlPane {
    constructor(general: General) {
        super(general);
    }

    genPane(object: Object3D): Pane {
        const pane = super.genPane(object);
        const light = object as Light;
        const PARAMS = {
            color: light.color.getHex(),
            intensity: 1,
        };
        this.objectPane
            ?.addInput(PARAMS, 'color', {
                view: 'color',
                picker: 'inline',
                expanded: false,
            })
            .on('change', (value) => {
                light.color.set(value.value);
            });
        this.objectPane?.addInput(PARAMS, 'intensity').on('change', (value) => {
            light.intensity = value.value;
        });
        return pane;
    }
}
