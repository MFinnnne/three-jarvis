import {customElement, property} from "lit/decorators.js";
import General from "../../../core/General";
import {html, LitElement, PropertyValues} from "lit";
import AddObjectCommand from "../../../core/commands/AddObjectCommand";
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import {consume} from "@lit-labs/context";
import {generalContext} from "../../../core/context/LitContext";

@customElement('file-menu')
export default class FileMenu extends LitElement {

	@consume({context: generalContext, subscribe: true})
	@property({attribute: false})
	private general?: General;

	constructor() {
		super();
	}


	protected firstUpdated(_changedProperties: PropertyValues) {
		super.firstUpdated(_changedProperties);
	}


	private undo() {

		this.general?.recorder.undo();
	}

	private redo() {
		this.general?.recorder.redo()
	}

	private export() {

	}

	private import(e: Event) {
		this.general?.loader.load(e).then(objects => {
			if (objects == null) {
				return;
			}
			if (objects instanceof Array) {
				for (let object of objects) {
					this.general?.recorder.execute(new AddObjectCommand(this.general.state.selectedObject, object));
				}
			} else {
				this.general?.recorder.execute(new AddObjectCommand(this.general.state.selectedObject, objects));
			}
		});
	}

	protected render(): unknown {
		return html`
        <sl-dropdown>
            <sl-button variant="neutral" slot="trigger">
                File
            </sl-button>
            <sl-menu style="max-width: 100px;">
                <sl-menu-item value="undo" @click="${this.undo}">Undo</sl-menu-item>
                <sl-menu-item value="redo" @click="${this.redo}">Redo</sl-menu-item>
                <sl-divider></sl-divider>
                <sl-menu-item value="Export" @click="${this.export}">Export</sl-menu-item>
                <sl-menu-item value="Import">
                    <input type="file" id="file" style="display: none" multiple @change="${(e) => this.import(e)}">
                    <label for="file">Import</label>
                </sl-menu-item>
            </sl-menu>
        </sl-dropdown>
		`
	}
}
