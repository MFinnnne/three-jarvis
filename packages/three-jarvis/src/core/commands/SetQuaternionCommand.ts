import {Object3D, Quaternion} from 'three';
import {Command} from '../Type';

export default class SetQuaternionCommand implements Command {
	name = 'change quaternion';
	oldQuaternion: Quaternion;
	newQuaternion: Quaternion;
	object: Object3D;

	constructor(object: Object3D, rotation: Quaternion) {
		this.object = object;
		this.oldQuaternion = object.quaternion.clone();
		this.newQuaternion = rotation.clone();
	}

	exec(): void {
		this.object.quaternion.copy(this.newQuaternion);
		this.object.updateMatrixWorld(true);
	}

	undo(): void {
		this.name = 'change quaternion';
		this.object.quaternion.copy(this.oldQuaternion);
		this.object.updateMatrixWorld(true);
	}
}
