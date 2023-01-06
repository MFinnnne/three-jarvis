import { VNode } from "million";
import ExportComponent from "../../core/component/ExportComponent";
import MenuUtils from "./MenuUtils";


export default class MenuBarExport {
    static element(): VNode {
        return MenuUtils.menItem("export", ["config-js", "json"], MenuBarExport.onClick);
    }

    private static onClick(type: string, e) {
        switch (type) {
            case "config-js":
                ExportComponent.exportConfigJS();
                break;
            default:
                break;
        }
    }
}
