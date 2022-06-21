import { HemisphereLight, Light, Object3D } from 'three';
import LightControlPane from './LightControlPane';
import { Pane } from 'tweakpane';

export default class HemisphereLightControlPane extends LightControlPane {
    genPane(object: Object3D): Pane {
        const light = object as HemisphereLight;
        const pane = super.genPane(object);
        const PARAMS = {
            groundColor: light.groundColor.getHex(),
        };
        this.objectPane
            ?.addInput(PARAMS, 'groundColor', {
                view: 'color',
                picker: 'inline',
                expanded: false,
            })
            .on('change', (value) => {
                light.groundColor.set(value.value);
            });
        return pane;
    }
}
