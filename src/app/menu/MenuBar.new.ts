import { VNode } from "million";
import MenuUtils from "./MenuUtils";
import Recorder from "../../core/Recorder";
import { Group } from "three";
import AddObjectCommand from "../../core/commands/AddObjectCommand";
import Jarvis from "../../core/Jarvis";

export default class MenuBarNew {
    private readonly jarvis: Jarvis;


    constructor(jarvis: Jarvis) {
        this.jarvis = jarvis;
    }

    element(): VNode {
        return MenuUtils.menItem("new", ["group", "light", "cube"], this.onClick);
    }

    onClick(type: string, e: Event) {
        if (type === "group") {
            Recorder.execute(new AddObjectCommand(this.jarvis.state.selectedObject, new Group()));
        }
    }
}
