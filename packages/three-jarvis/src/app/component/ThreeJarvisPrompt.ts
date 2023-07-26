import {css, html, LitElement, PropertyValues, render} from "lit";
import {customElement, property} from "lit/decorators.js";

@customElement('tj-prompt')
export class ThreeJarvisPrompt extends LitElement {

	static styles = css`
    .prompt {
			position: absolute;
    	top: 50%;
    }
	`

	@property()
	text = 'STARTING';

	constructor(text: string) {
		super();
		this.text = text;
		render(this.render(), document.body);
		this.addEventListener('animationend', () => {
			document.body.removeChild(this);
		})
	}

	protected update(changedProperties: PropertyValues) {
		super.update(changedProperties);
	}

	render() {
		return html`
			<div class="prompt">
				<span class="msg">${this.text}</span>
			</div>
		`;
	}
}
