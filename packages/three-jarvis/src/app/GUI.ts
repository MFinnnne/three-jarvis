import General from '../core/General';
import {html, render} from "lit";
import './ThreejarvisHomePage'

export default class GUI {
	public static guiContainerInit(general: General): void {
		const container = document.querySelector('#three-helper-container');
		container && container.remove();
		const threeParentNode = general.container?.parentNode as HTMLElement;
		if (threeParentNode) {
			render(html`
        <three-jarvis-home context="${general.container.id}">
            <slot>
            </slot>
        </three-jarvis-home>
		`, threeParentNode);
		}

		// const menuDom = document.createElement('div');
		// menuDom.id = 'three-helper-menu';
		// menuDom.className = 'three-helper-menu';
		// element.appendChild(menuDom);
		//
		// const paneAndTreeDom = document.createElement('div');
		// paneAndTreeDom.id = 'three-helper-pane-and-tree';
		// paneAndTreeDom.className = 'three-helper-pane-and-tree';
		// element.appendChild(paneAndTreeDom);
		//
		// const leftSideBarDom = document.createElement('div');
		// leftSideBarDom.id = 'three-helper-left-side-bar';
		// leftSideBarDom.className = 'three-helper-left-side-bar';
		// paneAndTreeDom.appendChild(leftSideBarDom);
		// general.leftSideBarContainer = leftSideBarDom;
		//
		// const paneDom = document.createElement('div');
		// paneDom.id = 'three-helper-pane';
		// paneDom.className = 'three-helper-pane';
		// paneAndTreeDom.appendChild(paneDom);
		// general.paneContainer = paneDom;
		//
		//

		// customElements.define("menu-bar", MenuBarElement);
		// render(html`
		// 	<div class="menu sl-theme-dark" id="menu">
		// 		<menu-bar context="${general.container.id}"></menu-bar>
		// 	</div>
		// `, menuDom);

		// const objectTree = new ObjectTree(leftSideBarDom, general);
		//
		// general.recorder?.afterExecute?.push((cmd) => {
		// 	if (cmd.name === 'add object' || cmd.name === 'remove object') {
		// 		objectTree.render(leftSideBarDom);
		// 	}
		// });
		// let prevGeometries = 0;
		// general.scene.onAfterRender = (renderer) => {
		// 	general.setFps();
		// 	const geometries = renderer.info.memory.geometries;
		// 	if (geometries !== prevGeometries) {
		// 		objectTree.render(leftSideBarDom);
		// 	}
		// 	prevGeometries = geometries;
		// };
		// clickObjectEvent(objectTree);
	}

	//hidden gui
	public static hiddenGUI(): void {
		const container = document.querySelector('#three-helper-container');
		if (container != null) {
			(<HTMLElement>container).style.visibility = 'hidden';
		}
	}

	static showGUI() {
		const container = document.querySelector('#three-helper-container');
		if (container != null) {
			(<HTMLElement>container).style.visibility = 'visible';
		}
	}
}
