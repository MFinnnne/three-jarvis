import ObjectControlPane from './ObjectControlPane';
import {Pane} from 'my-tweakpane';
import {Color, Object3D, Scene} from 'three';
import General from '../../core/General';
import SetPropertyCommand from "../../core/commands/SetPropertyCommand";
import ObjectChanged from "../../core/ObjectChanged";

export default class SceneControlPane extends ObjectControlPane {
	object!: Scene;

	constructor(general: General) {
		super(general);
	}

	genPane(object: Object3D): Pane {
		const pane = super.genPane(object);
		const scene = (<Scene>object);
		this.object = object as Scene;
		let bg_color;
		if (scene.background instanceof Color) {
			bg_color = scene.background.getHex();
		}

		const PARAMS = {
			bg_color: bg_color ?? 0xffffff,
		};
		this.objectPane?.addInput(PARAMS, 'bg_color', {
			view: 'color',
			picker: 'inline',
			expanded: false,
		}).on('change', (ev) => {
			if (ev.before) {
				this.general.recorder.execute(new SetPropertyCommand(object, "background", ev.value));
			}
			scene.background = new Color(ev.value);
			ObjectChanged.getInstance().update(this.object);
		});
		return pane;
	}

	update() {
		super.update();
	}
}
