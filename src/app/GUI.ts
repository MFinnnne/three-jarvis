import { Object3DTree } from './Object3DTree';
import Constant from '../constant/Constant';

export default class GUI {
    public static init(): void {
        const container = document.querySelector('#three-helper-container');
        container && container.remove();
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

        const paneDom = document.createElement('div');
        paneDom.id = 'three-helper-pane';
        paneDom.className = 'three-helper-pane';
        element.appendChild(paneDom);

        Constant.LEFT_SIDE_BAR_CONTAINER = element

        document.body.appendChild(element);
        Object3DTree.init();
    }
}
