import {Object3D} from 'three';
import General from './General';

export default class ObjectChanged {
	private static instance?: ObjectChanged;
	private jarvis!: General;

	/**
	 *   boxed  mesh
	 */
	private constructor() {}

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

	public objectHelper(object: Object3D): void {
		this.jarvis.state.selectedObject = object;
		if (object.type === 'Scene') {
			return;
		}
		debugger
		this.jarvis.transformControl.attach(object);
		return;
	}

	public update(target?: Object3D): void {
		const object = target ?? this.jarvis.state.selectedObject;
		if (object == null) {
			return;
		}
		object?.userData.helper?.update();
		if (this.jarvis.state.selectedObject.uuid === object.uuid) {
			this.objectHelper(object);
		}
	}
}
