import {ButtonApi, InputBindingApi, Pane, Point3d, Point4d, TabPageApi} from 'my-tweakpane';
import {Euler, Object3D, Quaternion, Vector3} from 'three';
import SetPositionCommand from '../../core/commands/SetPositionCommand';
import SetQuaternionCommand from '../../core/commands/SetQuaternionCommand';
import SetRotationCommand from '../../core/commands/SetRotationCommand';
import SetScaleCommand from '../../core/commands/SetScaleCommand';
import General from '../../core/General';
import ObjectChanged from '../../core/ObjectChanged';
import Utils from '../../util/Utils';
import DefaultControlPane from './DefaultControlPane';
import Toast from "../Toast";

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
		this.object = object;
		if (this.object.name === null || this.object.name === '') {
			this.pane.title = this.object.type;
		} else {
			this.pane.title = this.object.name;
		}
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

		this.objectPane.addInput({castShadow: object.castShadow}, 'castShadow').on('change', (ev) => {
			object.castShadow = ev.value;
		});
		this.objectPane.addInput({receiveShadow: object.receiveShadow}, 'receiveShadow').on('change', (ev) => {
			object.receiveShadow = ev.value;
		});

		this.objectPane.addInput({up: object.up}, 'up').on('change', (ev) => {
			object.up = ev.value;
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
			const tpEvent = ev as any;
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
		const positionBind = this.objectPane.addInput(PARAMS, 'position', {
			x: {step: 0.1},
			y: {step: 0.1},
			z: {step: 0.1}
		}).on('change', (ev) => {
			const {x, y, z} = ev.value;
			if (ev.before) {
				this.general.recorder.execute(new SetPositionCommand(object, this.object!.position));
			}
			this.object?.position.set(x, y, z);
			ObjectChanged.getInstance().update(this.object);
		});
		positionBind.controller_.view.labelElement.addEventListener('click', () => {
			const value = positionBind.controller_.binding.value.rawValue as Point3d;
			Utils.execCoy(`${value.x.toFixed(2)},${value.y.toFixed(2)},${value.z.toFixed(2)}`);
		});
		this.bindMap.set('position', positionBind);

		//scale
		const scaleBind = this.objectPane.addInput(PARAMS, 'scale').on('change', (ev) => {
			const {x, y, z} = ev.value;
			if (ev.before) {
				this.general.recorder.execute(new SetScaleCommand(object, this.object!.scale));
			}
			this.object?.scale.set(x, y, z);
			ObjectChanged.getInstance().update(this.object);
		});

		scaleBind.controller_.view.labelElement.addEventListener('click', () => {
			const value = scaleBind.controller_.binding.value.rawValue as Point3d;
			Utils.execCoy(`${value.x.toFixed(2)},${value.y.toFixed(2)},${value.z.toFixed(2)}`);
		});
		this.bindMap.set('scale', scaleBind);

		// euler
		const rotationBind = this.objectPane.addInput(PARAMS, 'rotation', {
			x: {step: 0.1},
			y: {step: 0.1},
			z: {step: 0.1}
		}).on('change', (e) => {
			if (e.before) {
				this.general.recorder.execute(new SetRotationCommand(object, this.object!.rotation));
			}
			const {x, y, z} = e.value;
			this.object?.rotation.set(x, y, z);
			ObjectChanged.getInstance().update(this.object);
		});
		rotationBind.controller_.view.labelElement.addEventListener('click', () => {
			const value = rotationBind.controller_.binding.value.rawValue as Euler;
			Utils.execCoy(`${value.x.toFixed(2)},${value.y.toFixed(2)},${value.z.toFixed(2)}`);
		});
		this.bindMap.set('rotation', rotationBind);

		// quaternion
		const quatBind = this.objectPane
			.addInput(PARAMS, 'quat', {
				expanded: false,
				x: {step: 0.1}, y: {step: 0.1}, z: {step: 0.1}, w: {step: 0.1},
				// optional, false by default
			}).on('change', (e) => {
				const {x, y, z, w} = e.value;
				if (e.before) {
					this.general.recorder.execute(new SetQuaternionCommand(object, this.object!.quaternion));
				}
				this.object?.quaternion.set(x, y, z, w);
				ObjectChanged.getInstance().update(this.object);
			});
		quatBind.controller_.view.labelElement.addEventListener('click', () => {
			const value = quatBind.controller_.binding.value.rawValue as Quaternion;
			Utils.execCoy(`${value.x.toFixed(2)},${value.y},${value.z},${value.w}`);
		});
		this.bindMap.set('quat', quatBind);
		return pane;
	}

	update() {
		this.bindMap.forEach((v: InputBindingApi<any, any>, k: string) => {
			if (this.object === undefined) {
				Toast.show('the pane is not associated with any object');
				return;
			}
			switch (k) {
				case 'position': {
					const position: Vector3 = this.object.position;
					v.setValue(new Point3d(position.x, position.y, position.z), false);
					break;
				}
				case 'rotation': {
					const euler: Euler = this.object.rotation;
					v.setValue(new Point3d(euler.x, euler.y, euler.z), false);
					break;
				}
				case 'scale': {
					const scale: Vector3 = this.object.scale;
					v.setValue(new Point3d(scale.x, scale.y, scale.z), false);
					break;
				}
				case 'quat': {
					const quat: Quaternion = this.object.quaternion;
					v.setValue(new Point4d(quat.x, quat.y, quat.z, quat.w), false);
					break;
				}
				default:
					break;
			}
		});
	}

	remove(): void {
		this.pane.dispose();
	}
}
