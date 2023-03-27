import {Object3D, Vector3} from 'three';
import {Command} from '../Type';

export default class SetPositionCommand implements Command {
	oldPosition: Vector3;
	newPosition: Vector3;
	private _object: Object3D;
	name = '';

	constructor(object: Object3D, position: Vector3) {
		this._object = object;
		this.oldPosition = object.position.clone();
		this.newPosition = position.clone();
	}

	get object(): Object3D {
		return this._object;
	}

	set object(value: Object3D) {
		this._object = value;
	}

	exec(): void {
		this._object.position.copy(this.newPosition);
	}

	undo(): void {
		this._object.position.copy(this.oldPosition);
	}
}
