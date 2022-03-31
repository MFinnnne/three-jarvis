import { Pane } from 'tweakpane';
import { Euler, Object3D, Quaternion, Vector3 } from 'three';
import DefaultControlPane from './DefaultControlPane';
import recorder from '../core/Recorder';
import SetPositionCommand from '../core/commands/setPositionCommand';
import SetRotationCommand from '../core/commands/setRotationCommand';
import TweakpaneRotationInputPlugin from '@0b5vr/tweakpane-plugin-rotation';
import SetScaleCommand from '../core/commands/SetScaleCommand';
import SetQuaternionCommand from '../core/commands/setQuaternionCommand';

export default class ObjectControlPane extends DefaultControlPane {
    public genPane(object: Object3D): Pane {
        this.pane.registerPlugin(TweakpaneRotationInputPlugin);

        const PARAMS = {
            position: {
                x: object.position.x,
                y: object.position.y,
                z: object.position.z,
            },
            scale: {
                x: object.scale.x,
                y: object.scale.y,
                z: object.scale.z,
            },
            rotation: {
                x: object.rotation.x,
                y: object.rotation.y,
                z: object.rotation.z,
            },
            quat: { x: object.quaternion.x, y: object.quaternion.y, z: object.quaternion.z, w: object.quaternion.w },
        };

        const tab = this.pane.addTab({
            pages: [{ title: 'Object' }, { title: 'Geometry' }, { title: 'Material' }],
        });
        const objectPane = tab.pages[0];
        objectPane.addInput(PARAMS, 'position').on('change', (ev) => {
            const { x, y, z } = ev.value;
            recorder.execute(new SetPositionCommand(object, new Vector3(x, y, z)));
        });
        objectPane.addInput(PARAMS, 'scale').on('change', (ev) => {
            const { x, y, z } = ev.value;
            recorder.execute(new SetScaleCommand(object, new Vector3(x, y, z)));
        });

        // euler
        objectPane
            .addInput(PARAMS, 'rotation', {
                view: 'rotation',
                rotationMode: 'euler',
                order: 'XYZ', // Extrinsic rotation order. optional, 'XYZ' by default
                unit: 'rad', // or 'rad' or 'turn'. optional, 'rad' by default
                picker: 'inline',
                expanded: false,
            })
            .on('change', (e) => {
                const { x, y, z } = e.value;
                recorder.execute(new SetRotationCommand(object, new Euler(x, y, z, 'XYZ')));
            });
        // quaternion
        objectPane
            .addInput(PARAMS, 'quat', {
                view: 'rotation',
                rotationMode: 'quaternion', // optional, 'quaternion' by default
                picker: 'inline', // or 'popup'. optional, 'popup' by default
                expanded: false, // optional, false by default
            })
            .on('change', (e) => {
                const { x, y, z, w } = e.value;
                recorder.execute(new SetQuaternionCommand(object, new Quaternion(x, y, z, w)));
            });

        return this.pane;
    }
}
