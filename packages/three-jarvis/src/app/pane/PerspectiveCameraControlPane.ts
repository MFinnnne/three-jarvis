import ObjectControlPane from './ObjectControlPane';
import {Object3D, PerspectiveCamera} from 'three';
import {Pane} from 'my-tweakpane';
import SetPropertyCommand from "../../core/commands/SetPropertyCommand";
import ObjectChanged from "../../core/ObjectChanged";

export default class PerspectiveCameraControlPane extends ObjectControlPane {
	genPane(object: Object3D): Pane {
		let camera = <PerspectiveCamera>object;
		super.genPane(object);
		this.objectPane?.addInput({far: camera.far}, 'far').on('change', (ev) => {
			if (ev.before) {
				this.general.recorder.execute(new SetPropertyCommand(object, "far", ev.value));
			}
			camera.far = ev.value;
			ObjectChanged.getInstance().update(this.object);
		});
		this.objectPane?.addInput({near: camera.near}, 'near').on('change', (ev) => {
			if (ev.before) {
				this.general.recorder.execute(new SetPropertyCommand(object, "near", ev.value));
			}
			camera.near = ev.value;
			ObjectChanged.getInstance().update(this.object);
		});
		this.objectPane?.addInput({aspect: camera.aspect}, 'aspect').on('change', (ev) => {
			if (ev.before) {
				this.general.recorder.execute(new SetPropertyCommand(object, "aspect", ev.value));
			}
			camera.near = ev.value;
			ObjectChanged.getInstance().update(this.object);
		});
		this.objectPane?.addInput({fov: camera.aspect}, 'fov').on('change', (ev) => {
			if (ev.before) {
				this.general.recorder.execute(new SetPropertyCommand(object, "fov", ev.value));
			}
			camera.fov = ev.value;
			ObjectChanged.getInstance().update(this.object);
		});
		return this.pane;
	}
}
