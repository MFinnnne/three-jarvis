import {render, VElement, VNode} from 'million';
import Constant from '../constant/Constant';
import {html} from 'million/html';
import Ticker from '../core/Ticker';
import {Input} from 'postcss';
import MenuBarExport from "./MenuBar.export";
import MenuBarImport from "./MenuBar.import";

export default class MenuBar {
    static init() {
        const element = <VElement>html`
            <div className=${{menu: true}}>
                <div></div>
            </div>`;
        element.children?.push(MenuBarImport.element())
        element.children?.push(MenuBarExport.element())
        render(Constant.MENU_CONTAINER, element);
    }

    private static onClick(type: string, e: PointerEvent): void {
        if (type === 'import') {
            const file = (e.target as any).files[0];
        }
    }
}
