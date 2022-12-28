import { VNode } from "million";
import MenuUtils from "./MenuUtils";

export default class MenuBarNew {
    static element(): VNode {
        return MenuUtils.menItem("new", ["group", "light", "cube"],MenuBarNew.onClick);
    }

    private static onClick(type: string, e: Event) {

    }
}
