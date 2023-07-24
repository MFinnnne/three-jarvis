import {
	BoxHelper,
	Camera,
	CameraHelper,
	ColorRepresentation,
	DirectionalLight,
	DirectionalLightHelper,
	HemisphereLight,
	HemisphereLightHelper,
	Object3D,
	PointLight,
	PointLightHelper
} from 'three';
import General from './General';

type helperFns = (object: Object3D, color?: ColorRepresentation) => Object3D | null;

let cameraHelper: CameraHelper | null = null;

export default class ObjectHelper {
	private helperMap: Map<String, helperFns> = new Map();
	private general!: General;

	constructor(general: General) {
		//light helper
		this.helperMap.set('HemisphereLight', (object) => this.lightHelperFn(object));
		this.helperMap.set('PointLight', (object) => this.lightHelperFn(object));
		this.helperMap.set('DirectionalLight', (object) => this.lightHelperFn(object));
		this.helperMap.set('PerspectiveCamera', (object, color) => this.cameraHelperFn(object as Camera));
		this.helperMap.set('Group', (object, color) => this.boxHelperFn(object));
		this.helperMap.set('Object3D', (object, color) => this.boxHelperFn(object));
		this.helperMap.set('Mesh', (object, color) => this.boxHelperFn(object));
		this.general = general;
	}

	genHelper(obj: Object3D, color?: ColorRepresentation) {
		const helperFn = this.helperMap.get(obj.type);
		if (helperFn === null || helperFn === undefined) {
			console.warn(`${obj.type} helper is not supported`);
		} else {
			const helper = helperFn(obj);
			if (helper === null) {
				throw new Error(`${obj.type} helper is gen error`);
			}
			obj.userData.helper = helper;
			helper.visible = true;
			helper.userData.isShow = false;
			this.general.scene.add(helper);
		}
	}

	private boxHelperFn(object, color = 0xffff00): Object3D | null {
		const highLightBox = new BoxHelper(object, color);
		highLightBox.layers.set(1);
		highLightBox.name = 'BoxHelper_' + object.id;
		highLightBox.setFromObject(object);
		highLightBox.update();
		return highLightBox;
	}

	private cameraHelperFn(camera: Camera): CameraHelper | null {
		cameraHelper = new CameraHelper(camera);
		cameraHelper.layers.set(3);
		return cameraHelper;
	}

	private lightHelperFn(object, color = 0xffff00): Object3D | null {
		let name = '';
		let helper: PointLightHelper | HemisphereLightHelper | DirectionalLightHelper | null = null;
		switch (object.type) {
			case 'DirectionalLight':
				helper = new DirectionalLightHelper(object as DirectionalLight, 5, color);
				break;
			case 'PointLight':
				helper = new PointLightHelper(object as PointLight, 5, color);
				break;
			case 'HemisphereLight':
				helper = new HemisphereLightHelper(object as HemisphereLight, 5, color);
				break;
			default:
				break;
		}
		if (helper) {
			helper.visible = true;
			helper.light = object;
			helper.layers.set(3);
			helper.update();
			helper.name = name + '_' + object.uuid;
			return helper;
		}
		return null;
	}
}
