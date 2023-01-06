import { m, render } from "million";
import MenuBarExport from "./MenuBar.export";
import MenuBarImport from "./MenuBar.import";
import MenuBarNew from "./MenuBar.new";
import Jarvis from "../../core/Jarvis";

export default class MenuBar {


    constructor() {
    }

    static render(parent: HTMLElement,jarvis:Jarvis) {
        const element = m(
            "div",
            {
                className: "menu"
            }, []
        );
        element.children?.push(new MenuBarNew(jarvis).element());
        element.children?.push(new MenuBarImport(jarvis).element());
        element.children?.push(new MenuBarExport(jarvis).element());
        render(parent, element);
    }

}
