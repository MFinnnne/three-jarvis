import {Pane} from 'tweakpane';
import {Euler, Object3D, Vector3} from 'three';
import DefaultControlPane from './DefaultControlPane';
import toDecimal from '../util/MathUtil';
import recorder from '../core/Recorder';
import SetPositionCommand from '../core/commands/setPositionCommand';
import SetRotationCommand from '../core/commands/setRotationCommand';
import TweakpaneRotationInputPlugin from '@0b5vr/tweakpane-plugin-rotation'
import SetScaleCommand from "../core/commands/SetScaleCommand";


export default class ObjectControlPane extends DefaultControlPane {


    public genPane(object: Object3D): Pane {
        this.pane.registerPlugin(TweakpaneRotationInputPlugin);

        const PARAMS = {
            position: {
                x: toDecimal(object.position.x),
                y: toDecimal(object.position.y),
                z: toDecimal(object.position.z),
            },
            scale: {
                x: toDecimal(object.scale.x),
                y: toDecimal(object.scale.y),
                z: toDecimal(object.scale.z),
            },
            syncScale: 0.0,
            rotation: {
                x: object.rotation.x,
                y: object.rotation.y,
                z: object.rotation.z
            },
            quat: {x: 0.0, y: 0.0, z: 0.0, w: 1.0},
        };
        const scope = this;
        this.pane.addInput(PARAMS, 'position').on('change', (ev) => {
            const {x, y, z} = ev.value;
            recorder.execute(new SetPositionCommand(object, new Vector3(x, y, z)));
        });
        this.pane.addInput(PARAMS, 'scale').on('change', (ev) => {
            const {x, y, z} = ev.value;
            recorder.execute(new SetScaleCommand(object, new Vector3(x, y, z)));
        });

        this.pane.addInput(PARAMS, 'syncScale', {step: 1}).on('change', (ev) => {
            const {x, y, z} = object.scale;
            const syncNum = ev.value;
            recorder.execute(new SetScaleCommand(object, new Vector3(x + syncNum, y + syncNum, z + syncNum)));
            scope.pane.refresh();
        });


        // euler
        this.pane.addInput(PARAMS, 'rotation', {
            view: 'rotation',
            rotationMode: 'euler',
            order: 'XYZ', // Extrinsic rotation order. optional, 'XYZ' by default
            unit: 'rad', // or 'rad' or 'turn'. optional, 'rad' by default
            picker: 'inline',
            expanded: true
        }).on('change', (e) => {
            const {x, y, z} = e.value;
            recorder.execute(new SetRotationCommand(object, new Euler(x, y, z, 'XYZ')));
        });

        // quaternion
        // const guiQuat = this.pane.addInput(params, 'quat', {
        //     view: 'rotation',
        //     rotationMode: 'quaternion', // optional, 'quaternion' by default
        //     picker: 'inline', // or 'popup'. optional, 'popup' by default
        //     expanded: true, // optional, false by default
        // });


        return this.pane;
    }
}
