import {m, VNode} from 'million';
import MenuUtils from './MenuUtils';
import AddObjectCommand from '../../core/commands/AddObjectCommand';
import sceneDB from '../../core/mapper/SceneDB';
import ExportComponent from '../../core/component/ExportComponent';
import dayjs from 'dayjs';
import General from '../../core/General';

export default class MenuBarFile {
	private readonly general: General;

	constructor(general: General) {
		this.general = general;
	}

	element(): VNode {
		return MenuUtils.menItem(
			'file',
			[
				'undo',
				'redo',
				'-',
				'export',
				m(
					'div',
					{
						className: 'tag import',
					},
					[
						m('input', {
							type: 'file',
							id: 'file',
							style: 'display:none',
							multiple: true,
							onchange: (e) => {
								this.onClick('import', e);
							},
						}),
						m(
							'label',
							{
								for: 'file',
							},
							['import'],
						),
					],
				),
			],
			this.onClick.bind(this),
		);
	}

	onClick(type: string, e: Event) {
		switch (type) {
			case 'export':
				sceneDB.get(this.general.container.id).then((scene) => {
					ExportComponent.exportJson(
						`${this.general.container.id}_scene_${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
						JSON.stringify(scene),
					);
				});
				break;
			case 'import':
				this.general.loader.load(e).then(objects => {
					if (objects == null) {
						return;
					}
					if (objects instanceof Array) {
						for (let object of objects) {
							this.general.recorder.execute(new AddObjectCommand(this.general.state.selectedObject, object));
						}
					} else {
						this.general.recorder.execute(new AddObjectCommand(this.general.state.selectedObject, objects));
					}
				});
				break;
			case 'undo':
				this.general.recorder.undo();
				break;
			case 'redo':
				this.general.recorder.redo();
				break;
			default:
				break;
		}
	}
};
