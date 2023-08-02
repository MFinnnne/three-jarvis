import {html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
@customElement('tj-content')
export class Content  extends LitElement{


	connectedCallback() {
		super.connectedCallback();
	}

	protected render(): unknown {
		return html`
        <div>
            <div id='three-helper-left-side-bar' class='three-helper-left-side-bar'>

            </div>
            <div id='three-helper-pane' class='three-helper-pane'>

            </div>
        </div>
		`;
	}
}
