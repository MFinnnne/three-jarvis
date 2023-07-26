import ObjectControlPane from './ObjectControlPane';
import {Object3D, PerspectiveCamera} from 'three';
import {InputBindingApi, Pane} from 'my-tweakpane';
import SetPropertyCommand from "../../core/commands/SetPropertyCommand";
import ObjectChanged from "../../core/ObjectChanged";
import Toast from "../Toast";

export default class PerspectiveCameraControlPane extends ObjectControlPane {
	genPane(object: Object3D): Pane {

		const camera = <PerspectiveCamera>object;
		super.genPane(object);

		//far
		const farBind = this.objectPane?.addInput({far: camera.far}, 'far').on('change', (ev) => {
			if (ev.before) {
				this.general.recorder.execute(new SetPropertyCommand(object, "far", camera.far));
			}
			camera.far = ev.value;
			ObjectChanged.getInstance().update(this.object);
		});
		this.bindMap.set('far',farBind!);

		//near
		const nearBind = this.objectPane?.addInput({near: camera.near}, 'near').on('change', (ev) => {
			if (ev.before) {
				this.general.recorder.execute(new SetPropertyCommand(object, "near", camera.near));
			}
			camera.near = ev.value;
			ObjectChanged.getInstance().update(this.object);
		});
		this.bindMap.set('near',nearBind!);

		//fov
		const fovBind = this.objectPane?.addInput({fov: camera.fov}, 'fov').on('change', (ev) => {
			if (ev.before) {
				this.general.recorder.execute(new SetPropertyCommand(object, "fov", camera.fov));
			}
			camera.fov = ev.value;
			ObjectChanged.getInstance().update(this.object);
		});
		this.bindMap.set('fov',fovBind!);
		return this.pane;
	}


	update() {
		super.update();
		this.bindMap.forEach((v: InputBindingApi<unknown, unknown>, k: string) => {
			if (this.object === undefined) {
				Toast.show('the pane is not associated with any object');
				return;
			}
			const camera = <PerspectiveCamera>this.object;
			switch (k) {
				case 'far': {
					const far: number = camera.far;
					v.setValue(far, false);
					break;
				}
				case 'near': {
					const near: number = camera.near;
					v.setValue(near, false);
					break;
				}
				case 'fov': {
					const fov: number = camera.fov;
					v.setValue(fov, false);
					break;
				}
				default:
					break;
			}
		});
	}
}
