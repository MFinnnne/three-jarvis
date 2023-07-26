import {html, LitElement, render} from 'lit-element';
import {customElement} from "lit/decorators.js";
import General from "../../core/General";
import FileMenu from "./FileMenu";
import * as SL from "@shoelace-style/shoelace";
@customElement('menu-bar')
export default class MenuBarElement extends LitElement {


	private readonly parent: HTMLElement;
	general: General;

	constructor(parent: HTMLElement, general: General) {
		super();
		this.parent = parent;
		this.general = general;
		render(this.render(), this.parent);
		new FileMenu(this.general);
		new SL.SlButton();
	}

	protected render(): unknown {
		return html`
			<div class="menu">
				<file-menu class="menu-item">
					<sl-button variant="primary">Button</sl-button>
					<!--                <div class="tag">-->
					<!--                    File-->
					<!--                    <div class="export">-->
					<!--                        <div class="dropbtn">-->
					<!--                            <a>undo</a>-->
					<!--                        </div>-->
					<!--                    </div>-->
					<!--                </div>-->
				</file-menu
			</div>
		`
	}
}
