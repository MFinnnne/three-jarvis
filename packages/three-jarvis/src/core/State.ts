import {Camera, Object3D, PerspectiveCamera} from 'three';
import CameraControlPane from '../app/pane/CameraControlPane';
import DefaultControlPane, {ControlPane} from '../app/pane/DefaultControlPane';
import DirectionalLightControlPane from '../app/pane/DirectionalLightControlPane';
import HemisphereLightControlPane from '../app/pane/HemisphereLightControlPane';
import ObjectControlPane from '../app/pane/ObjectControlPane';
import PointLightControlPane from '../app/pane/PointLightControlPane';
import General from './General';

export default class State {
	private _selectedObject: Object3D = new Object3D();
	private _selectedObjectDom: HTMLElement = document.createElement('div');
	private _activeCamera: Camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	private paneMap = new Map<string, () => ControlPane>();

	constructor(general: General) {
		this.paneMap.set('Sprite', () => new ObjectControlPane(general));
		this.paneMap.set('Points', () => new ObjectControlPane(general));
		this.paneMap.set('Group', () => new ObjectControlPane(general));
		this.paneMap.set('Object3D', () => new ObjectControlPane(general));
		this.paneMap.set('Mesh', () => new ObjectControlPane(general));

		this.paneMap.set('PointLightHelper', () => new ObjectControlPane(general));
		this.paneMap.set('HemisphereLight', () => new HemisphereLightControlPane(general));
		this.paneMap.set('PointLight', () => new PointLightControlPane(general));
		this.paneMap.set('DirectionalLight', () => new DirectionalLightControlPane(general));
		this.paneMap.set('PerspectiveCamera', () => new CameraControlPane(general));
	}

	get activeCamera(): Camera {
		return this._activeCamera;
	}

	set activeCamera(value: Camera) {
		this._activeCamera = value;
		if (this._activeCamera instanceof PerspectiveCamera) {
			this._activeCamera.updateProjectionMatrix();
		}
	}

	get selectedObjectDom(): HTMLElement | null {
		return this._selectedObjectDom;
	}

	set selectedObjectDom(value: HTMLElement | null) {
		if (value == null) {
			this._selectedObjectDom = document.createElement('div');
			return;
		}
		this._selectedObjectDom.classList.toggle('selected');
		this._selectedObjectDom = value;
		this._selectedObjectDom.classList.toggle('selected');
	}

	get selectedObject(): Object3D {
		return this._selectedObject;
	}

	set selectedObject(obj: Object3D) {
		if (obj.uuid === this._selectedObject.uuid) {
			return;
		}
		this._selectedObject?.userData.controlPane?.remove();
		this._selectedObject = obj;
		this._selectedObject.userData.controlPane = this.paneMap.get(this._selectedObject.type)?.apply(null);
		this._selectedObject.userData.controlPane.genPane(this._selectedObject);
		if (this._selectedObject.userData.controlPane === undefined) {
			console.log(`${obj.type} pane is not supported`);
		}
	}
}
