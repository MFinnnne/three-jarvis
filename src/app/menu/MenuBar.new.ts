import { VNode } from "million";
import MenuUtils from "./MenuUtils";
import Recorder from "../../core/Recorder";
import { Group } from "three";
import AddObjectCommand from "../../core/commands/AddObjectCommand";

export default class MenuBarNew {
    static element(): VNode {
        return MenuUtils.menItem("new", ["group", "light", "cube"], MenuBarNew.onClick);
    }

    private static onClick(type: string, e: Event) {
        if (type === "group") {
            Recorder.execute(new AddObjectCommand(new Group()));
        }
    }
}
