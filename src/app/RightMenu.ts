import RightMenu from '@right-menu/core'
import Constant from "../constant/Constant";
import ObjectTree from "./ObjectTree";
import {OBJECT_TREE_BLACK_LIST} from "../config/Config";

const FINISH = new Map();

export const rightMenu = (el: HTMLElement) => {
    if (FINISH.has(el.id)) {
        return;
    }
    FINISH.set(el.id, 1);
    return new RightMenu(
        {el: el, maxWidth: '50px'},
        [{
            type: 'li',
            text: 'delete',
            callback: () => {
                const object3D = Constant.rawVar.scene.getObjectByProperty('uuid', el.id);
                if (object3D) {
                    Constant.rawVar.scene.remove(object3D);
                }
            },
        }, {
            type: 'li',
            text: 'delete',
            callback: () => {
            }
        }]
    )
}