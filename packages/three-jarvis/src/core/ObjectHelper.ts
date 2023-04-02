import {
	BoxHelper,
	Camera,
	CameraHelper,
	Color,
	ColorRepresentation,
	DirectionalLight,
	DirectionalLightHelper,
	HemisphereLight,
	HemisphereLightHelper,
	Object3D,
	PointLight,
	PointLightHelper,
} from 'three';
import Toast from '../app/Toast';
import {OBJECT_TREE_BLACK_LIST} from '../config/Config';
import General from './General';

type helperFns = (object: Object3D, color?: ColorRepresentation) => Object3D | null;

let highLightBox: BoxHelper | null = null;
let lightHelper: PointLightHelper | HemisphereLightHelper | DirectionalLightHelper | null = null;
let dLightHelper: DirectionalLightHelper | null = null;
let hLightHelper: HemisphereLightHelper | null = null;
let pLightHelper: PointLightHelper | null = null;
// init camera helper
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
			Toast.show(`${obj.type} helper is not supported`);
			console.warn(`${obj.type} helper is not supported`);
		} else {
			const helper = helperFn(obj);
			if (helper === null) {
				Toast.show(`${obj.type} helper is gen error`);
				throw new Error(`${obj.type} helper is gen error`);
			}
			obj.userData.helper = helper;
			if (!OBJECT_TREE_BLACK_LIST.includes(helper.uuid)) {
				OBJECT_TREE_BLACK_LIST.push(helper.uuid);
			}
			helper.visible = true;
			this.general.scene.add(helper);
		}
	}

	private boxHelperFn(object, color = 0xffff00): Object3D | null {
		if (highLightBox) {
			highLightBox.visible = true;
			highLightBox.setFromObject(object);
			highLightBox.update();
			return null;
		}
		highLightBox = new BoxHelper(object, color);
		highLightBox.layers.set(1);
		highLightBox.name = 'BoxHelper_' + object.id;
		highLightBox.setFromObject(object);
		highLightBox.update(object);
		return highLightBox;
	}

	private cameraHelperFn(camera: Camera): CameraHelper | null {
		if (cameraHelper != null) {
			cameraHelper.dispose();
			cameraHelper.removeFromParent();
		}
		cameraHelper = new CameraHelper(camera);
		cameraHelper.layers.set(3);
		return cameraHelper;
	}

	private lightHelperFn(object, color = 0xffff00): Object3D | null {
		let lightObject: PointLight | HemisphereLight | DirectionalLight | null = null;
		let name = '';
		switch (object.type) {
			case 'DirectionalLight':
				lightObject = object as DirectionalLight;
				if (dLightHelper == null) {
					dLightHelper = new DirectionalLightHelper(lightObject, 5, color);
				}
				lightHelper = dLightHelper;
				name = 'DirectionalLight';
				break;
			case 'PointLight':
				lightObject = object as PointLight;
				if (pLightHelper == null) {
					pLightHelper = new PointLightHelper(lightObject, 5, color);
				}
				lightHelper = pLightHelper;
				name = 'PointLight';
				break;
			case 'HemisphereLight':
				lightObject = object as HemisphereLight;
				if (hLightHelper == null) {
					hLightHelper = new HemisphereLightHelper(lightObject, 5, color);
				}
				lightHelper = hLightHelper;
				name = 'HemisphereLight';
				break;
			default:
				break;
		}
		if (lightHelper && lightObject) {
			lightHelper.visible = true;
			lightHelper.light = lightObject;
			lightHelper.update();
			lightHelper.name = name + '_' + lightObject.uuid;
			return lightHelper;
		}
		return null;
	}
}
