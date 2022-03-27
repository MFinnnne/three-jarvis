import { LeftSideBar } from './LeftSideBar';
import ControlPanel from './ControlPanel';
import Constant from '../constant/Constant';

export default class GUI {
    public static init(): void {
        const element = document.createElement('div');
        element.id = 'three-helper-container';
        element.className = 'three-helper-container';

        const menuDom = document.createElement('div');
        menuDom.id = 'three-helper-menu';
        menuDom.className = 'three-helper-menu';
        element.appendChild(menuDom);

        const leftSideBarDom = document.createElement('div');
        leftSideBarDom.id = 'three-helper-left-side-bar';
        leftSideBarDom.className = 'three-helper-left-side-bar';
        element.appendChild(leftSideBarDom);

        document.body.appendChild(element);
        Constant.CONTAINER = element;
        Constant.MENU_CONTAINER = menuDom;
        Constant.LEFT_SIDE_BAR_CONTAINER = leftSideBarDom;

        GUI.initSideBar();
    }

    private static initSideBar(): void {
        LeftSideBar.generateTree();
        const controlPanel = new ControlPanel();
        controlPanel.init();
    }
}
