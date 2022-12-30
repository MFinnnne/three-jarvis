import RightMenu from "@right-menu/core";
import Constant from "../constant/Constant";
import ObjectTree from "./ObjectTree";
import TransformControlComponent from "../core/component/TransformControlComponent";
import state from "../core/State";
import Recorder from "../core/Recorder";
import RemoveObjectCommand from "../core/commands/RemoveObjectCommand";

const FINISH = new Map();

export const rightMenu = (el: HTMLElement) => {
    if (FINISH.has(el.id)) {
        return;
    }
    FINISH.set(el.id, 1);
    return new RightMenu(
        { el: el, maxWidth: "50px" },
        [{
            type: "li",
            text: "delete",
            callback: () => {
                const object3D = Constant.rawVar.scene.getObjectByProperty("uuid", el.id);
                if (object3D) {
                    Recorder.execute(new RemoveObjectCommand(object3D));
                    TransformControlComponent.CONTROLS.detach();
                    state.selectedObjectDom = null;
                }
            }
        }]
    );
};
