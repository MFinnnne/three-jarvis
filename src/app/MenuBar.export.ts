import {html} from "million/html";
import {VNode} from "million";

export default class MenuBarExport {
    static element(): VNode {
        return <VNode>html`
            <div className="${{'menu-item': true}}">
                <div className=${{tag: true}}>
                    <div className=${{dropbtn: true}}>export</div>
                </div>
                <div className=${{export: true}}>
                    <div className=${{'dropdown-content': true}}>
                        <a href="#" onclick=${(e) => MenuBarExport.onClick('config', e)}>config</a>
                        <a href="#">gltf</a>
                        <a href="#">glb</a>
                    </div>
                </div>
            </div>
        `;
    }

    private static onClick(type: string, e) {
        console.log(type+" export TODO");
    }
}
