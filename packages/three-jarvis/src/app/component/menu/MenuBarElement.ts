import {css, html, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";
import './FileMenu';
import General from "../../../core/General";
import {provide} from "@lit-labs/context";
import ThreeJarvisContext from "../../../core/context/ThreeJarvisContext";
import {generalContext} from "../../../core/context/LitContext";
import './AddMenu';

@customElement('menu-bar')
export default class MenuBarElement extends LitElement {

	@property({type: String})
	context: string = '';

	@provide({context: generalContext})
	protected general?: General;


	static styles = css`
		.tj-menu{
			background-color: #3c3f41;
		}
	`


	connectedCallback() {
		super.connectedCallback();
		this.general = ThreeJarvisContext.getContext(this.context);
	}

	constructor() {
		super();
	}

	protected render(): unknown {
		console.log(this.context);
		return html`
        <div class="tj-menu">
            <file-menu>
                <slot></slot>
            </file-menu>
            <add-menu>
                <slot></slot>
            </add-menu>
        </div>
		`
	}
}
