import LightControlPane from './LightControlPane';
import { Object3D, PointLight } from 'three';
import { Pane } from 'tweakpane';
import Jarvis from '../../core/Jarvis';
import SetPropertyCommand from '../../core/commands/SetPropertyCommand';

export default class PointLightControlPane extends LightControlPane {

    constructor(creator: Jarvis) {
        super(creator);
    }

    genPane(object: Object3D): Pane {
        super.genPane(object);
        const light = object as PointLight;
        const PARAMS = {
            distance: light.distance,
            decay: light.decay,
            power: light.power,
        };
        this.objectPane?.addInput(PARAMS, 'distance').on('change', (value) => {
            this.jarvis.recorder.execute(new SetPropertyCommand(light, 'distance', value.value));
        });
        this.objectPane?.addInput(PARAMS, 'decay').on('change', (value) => {
            this.jarvis.recorder.execute(new SetPropertyCommand(light, 'decay', value.value));
        });
        this.objectPane?.addInput(PARAMS, 'power').on('change', (value) => {
            this.jarvis.recorder.execute(new SetPropertyCommand(light, 'power', value.value));
        });
        return this.pane;
    }
}
