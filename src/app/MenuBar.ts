import { className, kebab, m, render, style } from 'million';
import Constant from '../constant/Constant';

export default class MenuBar {


    static render(): void {
        const element = m('div', {
            className: className({
                menu: true,
            }),
        }, []);
        const map = kebab({ tag: true }) as Record<string, boolean>;

        const child = m('div', { className: className({ menuItem: true }) }, [m('div', { className: className(map) }, ['import'])]);
        element.children?.push(child);
        render(Constant.MENU_CONTAINER, element);
    }
}
