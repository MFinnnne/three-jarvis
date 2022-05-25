import {className, m, render} from "million";
import Constant from "../constant/Constant";

export default class MenuBar {


    static render(): void {
        const element = m('div', {
            className: className({
                menu: true
            })
        }, []);
        const child = m('div', {className: className({menuItem: true})}, ['import'])
        element.children?.push(child)
        render(Constant.MENU_CONTAINER, element)
    }
}
