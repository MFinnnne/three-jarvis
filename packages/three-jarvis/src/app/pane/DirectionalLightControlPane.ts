import LightControlPane from './LightControlPane';
import { Pane } from 'tweakpane';
import { DirectionalLight, Object3D } from 'three';

export default class DirectionalLightControlPane extends LightControlPane {
    genPane(object: Object3D): Pane {
        super.genPane(object);
        const light = object as DirectionalLight;
        const PARAMS = {
            castShadow: light.castShadow,
        };
        this.objectPane?.addInput(PARAMS, 'castShadow').on('change', (e) => {
            light.castShadow = e.value;
        });
        return this.pane;
    }
}
