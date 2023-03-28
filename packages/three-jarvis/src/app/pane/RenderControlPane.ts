import {Pane} from 'my-tweakpane';
import {Object3D, WebGLRenderer} from 'three';
import DefaultControlPane from './DefaultControlPane';
import General from '../../core/General';

export default class RenderControlPane extends DefaultControlPane {
	protected object?: Object3D;

	constructor(general: General) {
		super(general);
	}

	public genPane(render: WebGLRenderer): Pane {
		const pane = super.genPane(render);
		const renderPane = pane.addFolder({title: 'render'});
		renderPane.addInput({gamaOutput: true}, 'gamaOutput').on('change', (ev) => {
			(<any>render).gammaOutput = ev.value;
		});
		renderPane.addInput({gammaFactor: 1}, 'gammaFactor').on('change', (ev) => {
			(<any>render).gammaFactor = ev.value;
		});
		renderPane.addInput({antialias: true}, 'antialias').on('change', (ev) => {
			(<any>render).antialias = ev.value;
		});
		return pane;
	}

	update() {}
}
