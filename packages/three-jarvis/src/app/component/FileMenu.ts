import {css, html, LitElement, render} from 'lit-element';
import {customElement, property} from "lit/decorators.js";
import General from "../../core/General";

@customElement('file-menu')
export default class FileMenu extends LitElement {



	@property()
	general: General;


	constructor(general: General) {
		super();
		this.general = general;
	}

	protected render(): unknown {
		return html`
        <div>
						<slot></slot>
        </div>
		`
	}
}
