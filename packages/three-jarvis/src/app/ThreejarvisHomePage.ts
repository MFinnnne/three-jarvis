import {css, html, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";
import './Header'
import './Content'
import './Bottom'
import {provide} from "@lit-labs/context";
import {generalContext} from "../core/context/LitContext";
import General from "../core/General";
import ThreeJarvisContext from "../core/context/ThreeJarvisContext";

@customElement('three-jarvis-home')
export default class ThreejarvisHomePage extends LitElement {


	@property({type: String})
	context: string = '';

	@provide({context: generalContext})
	protected general?: General;

	private width?: string;
	private height?: string;
	private top?: string;
	connectedCallback() {
		super.connectedCallback();
		this.general = ThreeJarvisContext.getContext(this.context);
		const domRect = this.general!.container.getBoundingClientRect();
		this.width = `${domRect.width}px`;
		this.height = `${domRect.height}px`;
		this.top = `${domRect.top}px`;
	}


	static styles = css`
		.tj-container {
			z-index: 1;
			position: absolute;
		}
	`

	constructor() {
		super();

	}





	protected render(): unknown {
		return html
			`<style>
				.tj-container {
					z-index: 1;
					position: relative;
					width: ${this.width};
					height: ${this.height};
					top: ${this.top};
				}	
			</style>
				<div class="tj-container">
					<div>
						<tj-header>
							<slot></slot>
						</tj-header>
					</div>
					<div>
						<tj-content>
							<slot></slot>
						</tj-content>
					</div>
					<div>
						<tj-bottom>
							<slot></slot>
						</tj-bottom>
					</div>
				</div>
			`
	}
}
