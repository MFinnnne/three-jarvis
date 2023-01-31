import { VNode } from 'million';
import MenuUtils from './MenuUtils';
import { AmbientLight, DirectionalLight, Group, HemisphereLight, PointLight, RectAreaLight, SpotLight } from 'three';
import AddObjectCommand from '../../core/commands/AddObjectCommand';
import General from '../../core/General';

export default class MenuBarNew {
    private readonly general: General;

    constructor(general: General) {
        this.general = general;
    }

    element(): VNode {
        return MenuUtils.menItem(
            'new',
            [
                'Group',
                '-',
                'PointLight',
                'SpotLight',
                'AmbientLight',
                'DirectionalLight',
                'HemisphereLight',
                'RectAreaLight',
            ],
            this.onClick.bind(this),
        );
    }
    onClick(type: string, e: Event) {
        switch (type) {
            case 'Group':
                this.general.recorder.execute(new AddObjectCommand(this.general.state.selectedObject, new Group()));
                break;
            case 'PointLight':
                this.general.recorder.execute(
                    new AddObjectCommand(this.general.state.selectedObject, new PointLight(0xff0000, 1, 100)),
                );
                break;
            case 'SpotLight':
                this.general.recorder.execute(new AddObjectCommand(this.general.state.selectedObject, new SpotLight()));
                break;
            case 'AmbientLight':
                this.general.recorder.execute(
                    new AddObjectCommand(this.general.state.selectedObject, new AmbientLight()),
                );
                break;
            case 'DirectionalLight':
                this.general.recorder.execute(
                    new AddObjectCommand(this.general.state.selectedObject, new DirectionalLight()),
                );
                break;
            case 'HemisphereLight':
                this.general.recorder.execute(
                    new AddObjectCommand(this.general.state.selectedObject, new HemisphereLight()),
                );
                break;
            case 'RectAreaLight':
                this.general.recorder.execute(
                    new AddObjectCommand(this.general.state.selectedObject, new RectAreaLight()),
                );
                break;
            default:
                break;
        }
    }
}
