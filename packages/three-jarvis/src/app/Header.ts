import {html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
import './component/menu/MenuBarElement';
@customElement('header')
export class Header extends LitElement{

	protected render(): unknown {
		return html`
        <div>
            <menu-bar></menu-bar>
        </div>
		`;
	}
}
