import LightControlPane from './LightControlPane';
import { Object3D, PointLight } from 'three';
import { Pane } from 'tweakpane';

export default class PointLightControlPane extends LightControlPane {

    genPane(object: Object3D): Pane {
        super.genPane(object);
        const light = object as PointLight;
        const PARAMS = {
            distance: light.distance,
            decay: light.decay,
            power: light.power,
        };
        this.objectPane?.addInput(PARAMS, 'distance').on('change', (value) => {
            light.distance = value.value;
        });
        this.objectPane?.addInput(PARAMS, 'decay').on('change', (value) => {
            light.decay = value.value;
        });
        this.objectPane?.addInput(PARAMS, 'power').on('change', (value) => {
            light.power = value.value;
        });
        return this.pane;
    }
}
