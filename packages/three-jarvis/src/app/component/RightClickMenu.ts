import {consume} from "@lit-labs/context";
import {html, LitElement, render} from "lit";
import {customElement, property} from "lit/decorators.js";
import General from "../../core/General";
import {generalContext} from "../../core/context/LitContext";

@customElement('add-menu')
export default class RightClickMenu extends LitElement {

	@consume({context: generalContext, subscribe: true})
	@property({attribute: false})
	private general!: General;

	private onClick(e: CustomEvent) {
	}

	protected render(): unknown {
		return super.render();
	}
}



