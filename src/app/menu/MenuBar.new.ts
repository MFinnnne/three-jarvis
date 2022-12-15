import { VNode } from "million";
import { html } from "million/html";
import MenuUtils from "./MenuUtils";

export default class MenuBarNew {
    static element(): VNode {
        return MenuUtils.menItem("new", ["group", "light", "cube"],MenuBarNew.onClick);
        // return <VNode>html`
        //     <div className="${{'menu-item': true}}">
        //         <div className=${{tag: true}}>
        //             <div className=${{dropbtn: true}}>new</div>
        //         </div>
        //         <div className=${{export: true}}>
        //             <div className=${{'dropdown-content': true}}>
        //                 <a href="#" onclick=${(e) => MenuBarNew.onClick('config', e)}>
        //                     Group
        //                 </a>
        //                 <a href="#">Light</a>
        //                 <a href="#">Cube</a>
        //             </div>
        //         </div>
        //     </div>
        // `;
    }

    private static onClick(type: string, e: Event) {

    }
}
