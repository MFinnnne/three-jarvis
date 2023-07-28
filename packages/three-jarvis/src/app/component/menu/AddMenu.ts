import {html, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";
import AddObjectCommand from "../../../core/commands/AddObjectCommand";
import {AmbientLight, DirectionalLight, Group, HemisphereLight, PointLight, RectAreaLight, SpotLight} from "three";
import {consume} from "@lit-labs/context";
import {generalContext} from "../../../core/context/LitContext";
import General from "../../../core/General";

@customElement('add-menu')
export default class AddMenu extends LitElement {

	@consume({context: generalContext, subscribe: true})
	@property({attribute: false})
	private general!: General;

	private onClick(e: CustomEvent) {
		const type = e.detail.item.value;
		switch (type) {
			case 'Group':
				this.general.recorder.execute(new AddObjectCommand(this.general.state.selectedObject, new Group()));
				break;
			case 'PointLight':
				this.general.recorder.execute(new AddObjectCommand(this.general.state.selectedObject, new PointLight(0xff0000, 1, 100)));
				break;
			case 'SpotLight':
				this.general.recorder.execute(new AddObjectCommand(this.general.state.selectedObject, new SpotLight()));
				break;
			case 'AmbientLight':
				this.general.recorder.execute(new AddObjectCommand(this.general.state.selectedObject, new AmbientLight()));
				break;
			case 'DirectionalLight':
				this.general.recorder.execute(new AddObjectCommand(this.general.state.selectedObject, new DirectionalLight()));
				break;
			case 'HemisphereLight':
				this.general.recorder.execute(new AddObjectCommand(this.general.state.selectedObject, new HemisphereLight()));
				break;
			case 'RectAreaLight':
				this.general.recorder.execute(new AddObjectCommand(this.general.state.selectedObject, new RectAreaLight()));
				break;
			default:
				break;
		}
	}

	protected render(): unknown {
		return html`
			<sl-dropdown>
				<sl-button variant="neutral" slot="trigger">
					Add
				</sl-button>
				<sl-menu style="max-width: 100px;" @sl-select="${(e) => {
					this.onClick(e)
				}}">
					<sl-menu-item value="Group">Group</sl-menu-item>
					<sl-divider></sl-divider>
					<sl-menu-item value="PointLight">PointLight</sl-menu-item>
					<sl-menu-item value="SpotLight">SpotLight</sl-menu-item>
					<sl-menu-item value="AmbientLight">AmbientLight</sl-menu-item>
					<sl-menu-item value="DirectionalLight">DirectionalLight</sl-menu-item>
					<sl-menu-item value="HemisphereLight">HemisphereLight</sl-menu-item>
					<sl-menu-item value="RectAreaLight">RectAreaLight</sl-menu-item>
				</sl-menu>
			</sl-dropdown>
		`;
	}
}
