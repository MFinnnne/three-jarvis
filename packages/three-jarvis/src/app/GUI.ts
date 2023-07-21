import ObjectTree from './ObjectTree';
import MenuBar from './menu/MenuBar';
import {clickObjectEvent} from '../core/events/ObjectEvents';
import General from '../core/General';

export default class GUI {
	public static guiContainerInit(general: General): void {
		const container = document.querySelector('#three-helper-container');
		container && container.remove();

		const element = document.createElement('div');
		element.id = 'three-helper-container';
		element.className = 'three-helper-container';

		const promptContainer = document.createElement('div');
		promptContainer.className = 'prompt-container';
		element.appendChild(promptContainer);

		const menuDom = document.createElement('div');
		menuDom.id = 'three-helper-menu';
		menuDom.className = 'three-helper-menu';
		element.appendChild(menuDom);

		const paneAndTreeDom = document.createElement('div');
		paneAndTreeDom.id = 'three-helper-pane-and-tree';
		paneAndTreeDom.className = 'three-helper-pane-and-tree';
		element.appendChild(paneAndTreeDom);

		const leftSideBarDom = document.createElement('div');
		leftSideBarDom.id = 'three-helper-left-side-bar';
		leftSideBarDom.className = 'three-helper-left-side-bar';
		paneAndTreeDom.appendChild(leftSideBarDom);
		general.leftSideBarContainer = leftSideBarDom;

		const paneDom = document.createElement('div');
		paneDom.id = 'three-helper-pane';
		paneDom.className = 'three-helper-pane';
		paneAndTreeDom.appendChild(paneDom);
		general.paneContainer = paneDom;

		const domRect = general.container.getBoundingClientRect();

		// element.style.width = `${domRect.width}px`;
		// element.style.height = `${domRect.height}px`;
		element.style.top = `${domRect.top}px`;
		general.container.parentNode?.appendChild(element);

		MenuBar.render(menuDom, general);
		const objectTree = new ObjectTree(leftSideBarDom, general);

		general.recorder?.afterExecute?.push((cmd) => {
			if (cmd.name === 'add object' || cmd.name === 'remove object') {
				objectTree.render(leftSideBarDom);
			}
		});
		let prevGeometries = 0;
		general.scene.onAfterRender = (renderer) => {
			const geometries = renderer.info.memory.geometries;
			if (geometries !== prevGeometries) {
				objectTree.render(leftSideBarDom);
			}
			prevGeometries = geometries;
		};
		clickObjectEvent(objectTree);
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
