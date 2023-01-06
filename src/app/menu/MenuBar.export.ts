import { VNode } from 'million';
import MenuUtils from './MenuUtils';
import Jarvis from '../../core/Jarvis';
import sceneDB from '../../core/mapper/SceneDB';
import ExportComponent from '../../core/component/ExportComponent';
import dayjs from 'dayjs';

export default class MenuBarExport {
    private readonly jarvis: Jarvis;

    constructor(jarvis: Jarvis) {
        this.jarvis = jarvis;
    }

    element(): VNode {
        return MenuUtils.menItem('export', ['json'], this.onClick.bind(this));
    }

    private onClick(type: string, e) {
        switch (type) {
            case 'json':
                sceneDB.get(this.jarvis.container.id).then((scene) => {
                    ExportComponent.exportJson(
                        `${this.jarvis.container.id}_scene_${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
                        JSON.stringify(scene),
                    );
                });
                break;
            default:
                break;
        }
    }
}
