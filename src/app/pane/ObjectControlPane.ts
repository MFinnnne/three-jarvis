import {BladeApi, Pane, TabPageApi} from 'tweakpane';
import {Euler, Object3D, Quaternion, Vector3} from 'three';
import DefaultControlPane from './DefaultControlPane';
import recorder from '../../core/Recorder';
import SetPositionCommand from '../../core/commands/SetPositionCommand';
import SetRotationCommand from '../../core/commands/SetRotationCommand';
import * as TweakpaneRotationInputPlugin from '@0b5vr/tweakpane-plugin-rotation';
import SetScaleCommand from '../../core/commands/SetScaleCommand';
import SetQuaternionCommand from '../../core/commands/SetQuaternionCommand';
import {Point3d} from "@tweakpane/core/dist/es6/input-binding/point-3d/model/point-3d";
import Utils from "../../util/Utils";
import Prompt from "../Prompt";
import Constant from "../../constant/Constant";
import TransformControlComponent from "../../core/component/TransformControlComponent";

export default class ObjectControlPane extends DefaultControlPane {
    protected objectPane?: TabPageApi;
    protected geometryPane?: TabPageApi;
    protected materialPane?: TabPageApi;
    protected object?: Object3D;

    public genPane(object: Object3D): Pane {
        const pane = super.genPane(object);
        this.object = object;
        pane.registerPlugin(TweakpaneRotationInputPlugin);
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
            quat: {x: object.quaternion.x, y: object.quaternion.y, z: object.quaternion.z, w: object.quaternion.w},
        };

        const tab = pane.addTab({
            pages: [{title: 'Object'}, {title: 'Geometry'}, {title: 'Material'}],
        });
        this.objectPane = tab.pages[0];
        this.objectPane.addButton({title:"scale"}).on('click',()=>{
            TransformControlComponent.CONTROLS.setMode("scale");
        });
        this.objectPane.addSeparator();
        this.objectPane.addButton({title:"translate"}).on('click',()=>{
            TransformControlComponent.CONTROLS.setMode("translate");
        });
        this.objectPane.addSeparator();
        this.objectPane.addButton({title:"rotate"}).on('click',()=>{
            TransformControlComponent.CONTROLS.setMode("rotate");
        });
        this.objectPane.addSeparator();
        this.geometryPane = tab.pages[1];
        this.materialPane = tab.pages[2];
        const positionBind = this.objectPane.addInput(PARAMS, 'position').on('change', (ev) => {
            if (Constant.rawVar.transformControls.dragging) {
                return;
            }
            const {x, y, z} = ev.value;
            recorder.execute(new SetPositionCommand(object, new Vector3(x, y, z), positionBind));
        });
        positionBind.controller_.view.labelElement.addEventListener('click', () => {
            const value = positionBind.controller_.binding.value.rawValue as Point3d;
            Utils.execCoy(`${value.x},${value.y},${value.z}`)
        });
        this.bindMap.set('position', positionBind);

        const scaleBind = this.objectPane.addInput(PARAMS, 'scale').on('change', (ev) => {
            if (Constant.rawVar.transformControls.dragging) {
                return;
            }
            const {x, y, z} = ev.value;
            recorder.execute(new SetScaleCommand(object, new Vector3(x, y, z)));
        });
        scaleBind.controller_.view.labelElement.addEventListener("click", () => {
            const value = scaleBind.controller_.binding.value.rawValue as Point3d;
            Utils.execCoy(`${value.x},${value.y},${value.z}`)
        })
        this.bindMap.set('scale', scaleBind);

        // euler
        const rotationBind = this.objectPane
            .addInput(PARAMS, 'rotation', {
                view: 'rotation',
                rotationMode: 'euler',
                order: 'XYZ', // Extrinsic rotation order. optional, 'XYZ' by default
                unit: 'rad', // or 'rad' or 'turn'. optional, 'rad' by default
                picker: 'inline',
                expanded: false,
            })
            .on('change', (e) => {
                if (Constant.rawVar.transformControls.dragging) {
                    return;
                }
                const {x, y, z} = e.value;
                recorder.execute(new SetRotationCommand(object, new Euler(x, y, z, 'XYZ'), scaleBind));
            })
        rotationBind.controller_.view.labelElement.addEventListener('click', () => {
            const value = rotationBind.controller_.binding.value.rawValue as Euler;
            Utils.execCoy(`${value.x},${value.y},${value.z}`)
        });
        this.bindMap.set('rotation', rotationBind);

        // quaternion
        const quatBind = this.objectPane
            .addInput(PARAMS, 'quat', {
                view: 'rotation',
                rotationMode: 'quaternion', // optional, 'quaternion' by default
                picker: 'inline', // or 'popup'. optional, 'popup' by default
                expanded: false, // optional, false by default
            })
            .on('change', (e) => {
                if (Constant.rawVar.transformControls.dragging) {
                    return;
                }
                const {x, y, z, w} = e.value;
                recorder.execute(new SetQuaternionCommand(object, new Quaternion(x, y, z, w), quatBind));
            });
        quatBind.controller_.view.labelElement.addEventListener('click', () => {
            const value = quatBind.controller_.binding.value.rawValue as Quaternion;
            Utils.execCoy(`${value.x},${value.y},${value.z},${value.w}`)
        })
        this.bindMap.set('quat', quatBind);
        return pane;
    }

    update() {
        this.bindMap.forEach((v: BladeApi<any>, k: string) => {
            if (this.object === undefined) {
                Prompt.eject("the pane is not associated with any object")
                return;
            }
            switch (k) {
                case 'position':
                    const position: Vector3 = this.object.position;
                    v.controller_.binding.value.rawValue = new Point3d(position.x, position.y, position.z);
                    break;
                case 'rotation':
                    const euler: Euler = this.object.rotation;
                    v.controller_.binding.value.rawValue = new Point3d(euler.x, euler.y, euler.z);
                    break;
                case 'scale':
                    const scale: Vector3 = this.object.scale;
                    v.controller_.binding.value.rawValue = new Point3d(scale.x, scale.y, scale.z);
                    break;
                case 'quat':
                    const quat: Quaternion = this.object.quaternion;
                    v.controller_.binding.value.rawValue = new Quaternion(quat.x, quat.y, quat.z, quat.w);
                    break;
                default :
                    break;
            }
        })
    }
}
