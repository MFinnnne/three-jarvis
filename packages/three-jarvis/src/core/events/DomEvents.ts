import {Scene} from 'three';
import EventRegistry from '../EventRegistry';
import ObjectChanged from '../ObjectChanged';
import Ticker from '../Ticker';

export function domClickEvent(scene: Scene): void {
	EventRegistry.registry('objectDomClick', (value) => {
		const id = value[0];
		const obj = scene.getObjectByProperty('uuid', id);
		if (!obj) {
			throw new Error(`object3d(uuid:${id}) is not in scene`);
		}
		ObjectChanged.getInstance().objectHelper(obj);
	});
}

export function domDoubleClickEvent(node: HTMLElement, scene: Scene): void {
	node.addEventListener('dblclick', (e) => {
		const element = e.target as HTMLElement;
		const id = element.id;
		if (id) {
			Ticker.emmit('objectDomDoubleClick', id);
		}
	});

	EventRegistry.registry('objectDomDoubleClick', (value) => {
		const id = value[0];
		const obj = scene.getObjectByProperty('uuid', id);
		if (!obj) {
			throw new Error(`object3d(uuid:${id}) is not in scene`);
		}
		ObjectChanged.getInstance().objectHelper(obj);
		Ticker.emmit('objectDoubleClick', obj);
	});
}
