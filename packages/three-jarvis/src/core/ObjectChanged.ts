import {Object3D, PerspectiveCamera} from 'three';
import General from './General';

export default class ObjectChanged {
	private static instance?: ObjectChanged;
	private jarvis!: General;

	/**
	 *   boxed  mesh
	 */
	private constructor() {
	}

	public static getInstance(general?: General): ObjectChanged {
		if (general) {
			if (this.instance) {
				return this.instance;
			}
			this.instance = new ObjectChanged();
			this.instance.jarvis = general;
			return this.instance;
		} else {
			if (this.instance === undefined) {
				throw new Error('object changed is null ');
			}
			return this.instance;
		}
	}

	public transformControlAttach(object: Object3D): void {
		this.jarvis.state.selectedObject = object;
		if (object.type === 'Scene') {
			return;
		}
		this.jarvis.transformControl.attach(object);
		return;
	}

	public update(target?: Object3D): void {
		const object = target ?? this.jarvis.state.selectedObject;
		if (object == null) {
			return;
		}
		object?.userData.helper?.update();
		//如果更改了相机的属性，需要更新相机的投影矩阵
		if (object.type === 'PerspectiveCamera') {
			(<PerspectiveCamera>object).updateProjectionMatrix();
		}
		if (this.jarvis.state.selectedObject.uuid === object.uuid) {
			this.transformControlAttach(object);
		}
	}
}
