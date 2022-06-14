import Constant from '../constant/Constant';
import Utils from '../util/Utils';
import ObjectTree from './ObjectTree';
import MenuBar from './MenuBar';
import Prompt from "./Prompt";

export default class GUI {
    public static guiContainerInit(): void {
        const container = document.querySelector('#three-helper-container');
        container && container.remove();
        const element = document.createElement('div');
        element.id = 'three-helper-container';
        element.className = 'three-helper-container';


        const menuDom = document.createElement('div');
        menuDom.id = 'three-helper-menu';
        menuDom.className = 'three-helper-menu';
        Constant.MENU_CONTAINER = menuDom;
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

        document.body.appendChild(element);

        MenuBar.init();
        Prompt.eject("ok");
        setInterval(() => {
            ObjectTree.render();
        }, 1000);
    }
}
