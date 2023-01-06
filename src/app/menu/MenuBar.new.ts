import {VNode} from "million";
import MenuUtils from "./MenuUtils";
import {AmbientLight, DirectionalLight, Group, HemisphereLight, PointLight, RectAreaLight, SpotLight} from "three";
import AddObjectCommand from "../../core/commands/AddObjectCommand";
import Jarvis from "../../core/Jarvis";

export default class MenuBarNew {
    private readonly jarvis: Jarvis;


    constructor(jarvis: Jarvis) {
        this.jarvis = jarvis;
    }

    element(): VNode {
        return MenuUtils.menItem("new", ["Group",'-', "PointLight", "SpotLight", "AmbientLight", "DirectionalLight", "HemisphereLight", "RectAreaLight"], this.onClick.bind(this));
    }
    onClick(type: string, e: Event) {
        switch (type) {
            case 'Group':
                this.jarvis.recorder.execute(new AddObjectCommand(this.jarvis.state.selectedObject, new Group()));
                break;
            case 'PointLight':
                this.jarvis.recorder.execute(new AddObjectCommand(this.jarvis.state.selectedObject, new PointLight(0xff0000,1,100)));
                break;
            case 'SpotLight':
                this.jarvis.recorder.execute(new AddObjectCommand(this.jarvis.state.selectedObject, new SpotLight()));
                break;
            case "AmbientLight":
                this.jarvis.recorder.execute(new AddObjectCommand(this.jarvis.state.selectedObject, new AmbientLight()));
                break;
            case "DirectionalLight":
                this.jarvis.recorder.execute(new AddObjectCommand(this.jarvis.state.selectedObject, new DirectionalLight()));
                break;
            case "HemisphereLight":
                this.jarvis.recorder.execute(new AddObjectCommand(this.jarvis.state.selectedObject, new HemisphereLight()));
                break;
            case "RectAreaLight":
                this.jarvis.recorder.execute(new AddObjectCommand(this.jarvis.state.selectedObject, new RectAreaLight()));
                break;
            default:
                break;
        }
    }
}
