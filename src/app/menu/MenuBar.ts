import { m, render, VElement } from "million";
import Constant from "../../constant/Constant";
import MenuBarExport from "./MenuBar.export";
import MenuBarImport from "./MenuBar.import";
import MenuBarNew from "./MenuBar.new";
import { html } from "million/html";

export default class MenuBar {
    static init() {
        const element = m(
            "div",
            {
                className: "menu"
            },[]
        );
        element.children?.push(MenuBarNew.element());
        element.children?.push(MenuBarImport.element());
        element.children?.push(MenuBarExport.element());
        render(Constant.MENU_CONTAINER, element);
    }

    private static onClick(type: string, e: PointerEvent): void {
        if (type === "import") {
            const file = (e.target as any).files[0];
        }
    }
}
