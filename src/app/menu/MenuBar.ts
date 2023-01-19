import {m, render} from 'million';
import MenuBarNew from './MenuBar.new';
import MenuBarFile from './MenuBar.file';
import General from "../../core/General";

export default class MenuBar {
    constructor() {}

    static render(parent: HTMLElement, general: General) {
        const element = m(
            'div',
            {
                className: 'menu',
            },
            [],
        );
        element.children?.push(new MenuBarFile(general).element());
        element.children?.push(new MenuBarNew(general).element());
        render(parent, element);
    }
}
