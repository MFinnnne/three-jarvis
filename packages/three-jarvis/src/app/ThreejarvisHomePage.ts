import {html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
import './Header'
import './Content'
import './Bottom'
@customElement('three-jarvis-home')
export default class ThreejarvisHomePage extends LitElement {
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
