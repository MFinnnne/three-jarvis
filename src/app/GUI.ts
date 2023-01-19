import Constant from '../constant/Constant';
import ObjectTree from './ObjectTree';
import MenuBar from './menu/MenuBar';
import {clickObjectEvent} from '../core/events/ObjectEvents';
import General from "../core/General";

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

        const leftSideBarDom = document.createElement('div');
        leftSideBarDom.id = 'three-helper-left-side-bar';
        leftSideBarDom.className = 'three-helper-left-side-bar';
        element.appendChild(leftSideBarDom);
        Constant.LEFT_SIDE_BAR_CONTAINER = leftSideBarDom;

        const paneDom = document.createElement('div');
        paneDom.id = 'three-helper-pane';
        paneDom.className = 'three-helper-pane';
        element.appendChild(paneDom);
        Constant.PANE_CONTAINER = paneDom;
        document.body.appendChild(element);
        MenuBar.render(menuDom, general);
        const objectTree = new ObjectTree(leftSideBarDom, general);

        general.recorder.afterExecute.push((cmd, optionalName) => {
            if (cmd.name === 'add object' || cmd.name === 'remove object') {
                objectTree.render(leftSideBarDom);
            }
        });
        let prevGeometries = 0;
        general.scene.onAfterRender = (renderer, scene) => {
            const geometries = renderer.info.memory.geometries;
            if (geometries !== prevGeometries) {
                objectTree.render(leftSideBarDom);
            }
            prevGeometries = geometries;
        };
        clickObjectEvent(objectTree);
    }
}
