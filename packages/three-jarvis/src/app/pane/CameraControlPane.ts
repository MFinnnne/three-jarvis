import ObjectControlPane from './ObjectControlPane';
import {Object3D, PointLight} from 'three';
import {Pane} from 'my-tweakpane';

export default class CameraControlPane extends ObjectControlPane {
	genPane(object: Object3D): Pane {
		return super.genPane(object);
	}
}
