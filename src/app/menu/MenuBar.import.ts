import { html } from "million/html";
import { m, VNode } from "million";
import Loader from "../../core/Loader";
import MenuUtils from "./MenuUtils";
import Jarvis from "../../core/Jarvis";

export default class MenuBarImport {
    private readonly jarvis: Jarvis;

    constructor(jarvis: Jarvis) {
        this.jarvis = jarvis;
    }

    element(): VNode {

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
                                    this.onClick("import", e);
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

    private onClick(type, e) {
        if (type === "import") {
            const file = (e.target as any).files;
            Loader.loadFiles(file, this.jarvis.state.selectedObject);
        }
    }
}
