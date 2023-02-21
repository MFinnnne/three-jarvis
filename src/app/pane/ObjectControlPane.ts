import {BladeApi, ButtonApi, Pane, TabPageApi} from 'tweakpane';
import {Euler, Object3D, Quaternion, Vector3} from 'three';
import DefaultControlPane from './DefaultControlPane';
import SetPositionCommand from '../../core/commands/SetPositionCommand';
import SetRotationCommand from '../../core/commands/SetRotationCommand';
import SetScaleCommand from '../../core/commands/SetScaleCommand';
import SetQuaternionCommand from '../../core/commands/SetQuaternionCommand';
import {Point3d} from '@tweakpane/core/dist/es6/input-binding/point-3d/model/point-3d';
import Utils from '../../util/Utils';
import Prompt from '../Prompt';
import {TpButtonGridEvent} from '@tweakpane/plugin-essentials/dist/types/button-grid/api/tp-button-grid-event';
import General from '../../core/General';
import ObjectChanged from "../../core/ObjectChanged";

export default class ObjectControlPane extends DefaultControlPane {
    protected objectPane?: TabPageApi;
    protected geometryPane?: TabPageApi;
    protected materialPane?: TabPageApi;
    protected object?: Object3D;

    constructor(general: General) {
        super(general);
    }

    public genPane(object: Object3D): Pane {
        const pane = super.genPane(object);
        pane.title = 'object';
        this.object = object;
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
        this.objectPane.addBlade({
            view: 'text',
            label: 'id',
            parse: (v) => String(v),
            value: object.id,
        });
        this.objectPane.addBlade({
            view: 'text',
            label: 'uuid',
            parse: (v) => String(v),
            value: object.uuid,
        });
        this.objectPane.addInput({visible: object.visible}, 'visible').on('change', (ev) => {
            object.visible = ev.value;
        });
        this.objectPane.addBlade({
            view: 'text',
            label: 'layer',
            parse: (v) => String(v),
            value: object.layers.mask,
        });
        if (this.object.userData.id) {
            this.objectPane.addBlade({
                view: 'text',
                label: 'userData.id',
                parse: (v) => String(v),
                value: object.userData.id,
            });
        }
        const controlsGridPane = this.objectPane.addBlade({
            view: 'buttongrid',
            size: [3, 1],
            cells: (x, y) => ({
                title: [['rotate'], ['scale'], ['translate']][x][y],
            }),
            label: 'control',
        }) as ButtonApi;
        controlsGridPane.on('click', (ev) => {
            const tpEvent = ev as TpButtonGridEvent;
            if (tpEvent.index[0] === 0) {
                // rotate
                this.general.transformControl.setMode('rotate');
            }
            if (tpEvent.index[0] === 1) {
                // scale
                this.general.transformControl.setMode('scale');
            }
            if (tpEvent.index[0] === 2) {
                // translate
                this.general.transformControl.setMode('translate');
            }
        });

        this.geometryPane = tab.pages[1];
        this.materialPane = tab.pages[2];
        let isFirstPotion = false;
        const positionBind = this.objectPane.addInput(PARAMS, 'position').on('change', (ev) => {
            if (this.general.transformControl.dragging) {
                return;
            }

            const {x, y, z} = ev.value;
            if (!isFirstPotion) {
                isFirstPotion = true;
                this.general.recorder.execute(new SetPositionCommand(object, this.object!.position));
            }
            this.object?.position.set(x, y, z);
            ObjectChanged.getInstance().update(this.object);
            if (ev.last) {
                isFirstPotion = false;
            }
        });
        positionBind.controller_.view.labelElement.addEventListener('click', () => {
            const value = positionBind.controller_.binding.value.rawValue as Point3d;
            Utils.execCoy(`${value.x.toFixed(2)},${value.y.toFixed(2)},${value.z.toFixed(2)}`);
        });
        this.bindMap.set('position', positionBind);
        let isFirstScale: boolean = false;
        const scaleBind = this.objectPane.addInput(PARAMS, 'scale').on('change', (ev) => {
            if (this.general.transformControl.dragging) {
                return;
            }
            const {x, y, z} = ev.value;
            if (!isFirstScale) {
                this.general.recorder.execute(new SetScaleCommand(object, this.object!.scale));
                isFirstScale = true;
            }
            this.object?.scale.set(x, y, z);
            ObjectChanged.getInstance().update(this.object);
            if (ev.last) {
                isFirstScale = false;
            }

        });

        scaleBind.controller_.view.labelElement.addEventListener('click', () => {
            const value = scaleBind.controller_.binding.value.rawValue as Point3d;
            Utils.execCoy(`${value.x.toFixed(2)},${value.y.toFixed(2)},${value.z.toFixed(2)}`);
        });
        this.bindMap.set('scale', scaleBind);

        // euler
        let isFirstRotation = false;
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
                if (this.general.transformControl.dragging) {
                    return;
                }
                if (!isFirstRotation) {
                    this.general.recorder.execute(new SetRotationCommand(object, this.object!.rotation));
                    isFirstRotation = true;
                }
                const {x, y, z} = e.value;
                this.object?.rotation.set(x, y, z);
                ObjectChanged.getInstance().update(this.object);
                if (e.last) {
                    isFirstRotation = false;
                }
            });
        rotationBind.controller_.view.labelElement.addEventListener('click', () => {
            const value = rotationBind.controller_.binding.value.rawValue as Euler;
            Utils.execCoy(`${value.x.toFixed(2)},${value.y.toFixed(2)},${value.z.toFixed(2)}`);
        });
        this.bindMap.set('rotation', rotationBind);

        // quaternion
        let isFirstQuat = false;
        const quatBind = this.objectPane
            .addInput(PARAMS, 'quat', {
                view: 'rotation',
                rotationMode: 'quaternion', // optional, 'quaternion' by default
                picker: 'inline', // or 'popup'. optional, 'popup' by default
                expanded: false, // optional, false by default
            })
            .on('change', (e) => {
                if (this.general.transformControl.dragging) {
                    return;
                }
                const {x, y, z, w} = e.value;
                if (!isFirstQuat) {
                    this.general.recorder.execute(new SetQuaternionCommand(object, this.object!.quaternion));
                }
                this.object?.quaternion.set(x, y, z, w);
                ObjectChanged.getInstance().update(this.object);
                if (e.last) {
                    isFirstQuat = false;
                }
            });
        quatBind.controller_.view.labelElement.addEventListener('click', () => {
            const value = quatBind.controller_.binding.value.rawValue as Quaternion;
            Utils.execCoy(`${value.x.toFixed(2)},${value.y},${value.z},${value.w}`);
        });
        this.bindMap.set('quat', quatBind);
        return pane;
    }

    update() {
        this.bindMap.forEach((v: BladeApi<any>, k: string) => {
            if (this.object === undefined) {
                Prompt.eject('the pane is not associated with any object');
                return;
            }
            switch (k) {
                case 'position': {
                    const position: Vector3 = this.object.position;
                    v.controller_.binding.value.rawValue = new Point3d(position.x, position.y, position.z);
                    break;
                }
                case 'rotation': {
                    const euler: Euler = this.object.rotation;
                    v.controller_.binding.value.rawValue = new Point3d(euler.x, euler.y, euler.z);
                    break;
                }
                case 'scale': {
                    const scale: Vector3 = this.object.scale;
                    v.controller_.binding.value.rawValue = new Point3d(scale.x, scale.y, scale.z);
                    break;
                }
                case 'quat': {
                    const quat: Quaternion = this.object.quaternion;
                    v.controller_.binding.value.rawValue = new Quaternion(quat.x, quat.y, quat.z, quat.w);
                    break;
                }
                default:
                    break;
            }
        });
    }
}
