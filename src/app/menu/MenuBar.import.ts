import { html } from "million/html";
import { m, VNode } from "million";
import Loader from "../../core/Loader";
import MenuUtils from "./MenuUtils";

export default class MenuBarImport {
    static element(): VNode {

        return m("div",
            {
                className: "menu-item"
            },
            [
                m(
                    "div", {
                        className: "tag import"
                    }, [
                        m(
                            "input",
                            {
                                type: "file", id: "file", style: "display:none", multiple: true, onchange: (e) => {
                                    MenuBarImport.onClick("import", e);
                                }
                            }),
                        m(
                            "label",
                            {
                                for: "file"
                            }, ["import"]
                        )
                    ]
                )
            ]
        );
    }

    private static onClick(type, e) {
        if (type === "import") {
            const file = (e.target as any).files;
            Loader.loadFiles(file);
        }
    }
}
