import { m, render } from 'million';
import MenuBarNew from './MenuBar.new';
import Jarvis from '../../core/Jarvis';
import MenuBarFile from './MenuBar.file';

export default class MenuBar {
    constructor() {}

    static render(parent: HTMLElement, jarvis: Jarvis) {
        const element = m(
            'div',
            {
                className: 'menu',
            },
            [],
        );
        element.children?.push(new MenuBarFile(jarvis).element());
        element.children?.push(new MenuBarNew(jarvis).element());
        render(parent, element);
    }
}
