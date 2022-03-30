import { Pane } from 'tweakpane';
import { Euler, Object3D, Vector3 } from 'three';
import DefaultControlPane from './DefaultControlPane';
import toDecimal from '../util/MathUtil';
import Recorder from '../core/Recorder';
import SetPositionCommand from '../core/commands/setPositionCommand';
import SetRotationCommand from '../core/commands/setRotationCommand';

export default class ObjectControlPane extends DefaultControlPane {
    public genPane(object: Object3D): Pane {
        const PARAMS = {
            position: {
                x: toDecimal(object.position.x),
                y: toDecimal(object.position.y),
                z: toDecimal(object.position.z),
            },
            rotation: {
                x: toDecimal(object.rotation.x),
                y: toDecimal(object.rotation.y),
                z: toDecimal(object.rotation.z),
            },
        };
        this.pane.addInput(PARAMS, 'position').on('change', (ev) => {
            const { x, y, z } = ev.value;
            Recorder.getInstance().execute(new SetPositionCommand(object, new Vector3(x, y, z)));
        });
        this.pane.addInput(PARAMS, 'rotation').on('change', (ev) => {
            const { x, y, z } = ev.value;
            Recorder.getInstance().execute(new SetRotationCommand(object, new Euler(x, y, z, 'XYZ')));
        });
        return this.pane;
    }
}
