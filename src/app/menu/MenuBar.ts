import { m, render } from "million";
import Constant from "../../constant/Constant";
import MenuBarExport from "./MenuBar.export";
import MenuBarImport from "./MenuBar.import";
import MenuBarNew from "./MenuBar.new";

export default class MenuBar {
    static render(parent: HTMLElement) {
        const element = m(
            "div",
            {
                className: "menu"
            }, []
        );
        element.children?.push(MenuBarNew.element());
        element.children?.push(MenuBarImport.element());
        element.children?.push(MenuBarExport.element());
        render(parent, element);
    }

}
