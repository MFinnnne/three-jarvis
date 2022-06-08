import {render, VNode} from 'million';
import Constant from '../constant/Constant';
import {html} from "million/html";
import Ticker from "../core/Ticker";
import {Input} from "postcss";

export default class MenuBar {

    static init() {
        const element = html`
            <div className=${{menu: true}}>
                <div className=${{'menu-item': true}}>
                    <div className=${{tag: true,import:true}}>
                        <input type="file" id="file" style="display: none"
                               onchange=${(e) => MenuBar.onClick('import', e)}/>
                        <label for="file">
                            import
                        </label>
                    </div>
                  
                </div>
                <div className='${{'menu-item':true}}'>
                    <div className=${{tag:true,export:true}}>
                        <div className=${{'dropbtn':true}}>export</div>
                        <div className=${{'dropdown-content':true}}>
                            <a href="#">config</a>
                            <a href="#">gltf</a>
                            <a href="#">glb</a>
                        </div>
                    </div>
                </div>
            </div>`
        render(Constant.MENU_CONTAINER, element as VNode);
    }

    private static onClick(type: string, e: PointerEvent): void {
        if (type === 'import') {
            const file = (e.target as any).files[0];
            Ticker.emmit('importEvent', file)
        }
    }
}
