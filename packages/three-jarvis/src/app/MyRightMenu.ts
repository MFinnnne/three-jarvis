import RightMenu from '@right-menu/core';
import RemoveObjectCommand from '../core/commands/RemoveObjectCommand';
import General from '../core/General';

const clickSet = new Set();
export default function genMyRightMenu(el: HTMLElement, general: General) {
	if (clickSet.has(el.id)) {
		return;
	}
	clickSet.add(el.id);
	return new MyRightMenu(el, general);
}

class MyRightMenu extends RightMenu {
	private general!: General;
	constructor(el: HTMLElement, general: General) {
		super({el: el, maxWidth: '50px'}, [
			{
				type: 'li',
				text: 'delete',
				callback: () => {
					const object3D = this.general.scene.getObjectByProperty('uuid', el.id);
					if (object3D) {
						this.general.recorder.execute(new RemoveObjectCommand(object3D));
						this.general.transformControl.detach();
						this.general.state.selectedObjectDom = null;
						if (this.general.onDelete) {
							this.general.onDelete(object3D);
						}
					}
				},
			},
		]);
		this.general = general;
	}
}
