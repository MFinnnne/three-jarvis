import {html, LitElement} from "lit";
import {customElement,property} from "lit/decorators.js";
import './Header'
import './Content'
import './Bottom'
import {provide} from "@lit-labs/context";
import {generalContext} from "../core/context/LitContext";
import General from "../core/General";
import ThreeJarvisContext from "../core/context/ThreeJarvisContext";

@customElement('three-jarvis-home')
export default class ThreejarvisHomePage extends LitElement {
	connectedCallback() {
		super.connectedCallback();
		this.general = ThreeJarvisContext.getContext(this.context);
	}


	@property({type: String})
	context: string = '';

	@provide({context: generalContext})


	protected general?: General;

	protected render(): unknown {
		return html
			`
				<div>
					<div id='three-helper-menu' class='three-helper-menu'>
						<header>
							<slot></slot>
						</header>
					</div>
					<div id='three-helper-pane-and-tree' class='three-helper-pane-and-tree'>
						<content>
							<slot></slot>
						</content>
					</div>
					<div>
						<bottom>
							<slot></slot>
						</bottom>
					</div>
				</div>
			`
	}
}
