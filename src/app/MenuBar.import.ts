import {html} from "million/html";
import {VNode} from "million";
import Loader from "../core/Loader";

export default class MenuBarImport {
    static element(): VNode {
        return <VNode>html`
            <div className=${{'menu-item': true}}>
                <div className=${{tag: true, import: true}}>
                    <input
                        type="file"
                        id="file"
                        style="display: none"
                        multiple="${true}"
                        onchange=${(e) => MenuBarImport.onClick('import', e)}
                    />
                    <label for="file"> import </label>
                </div>
            </div>
        `
    }

    private static onClick(type, e) {
        if (type === 'import') {
            const file = (e.target as any).files;
            Loader.loadFiles(file);
        }
    }
}
