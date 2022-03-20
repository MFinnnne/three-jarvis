import { ObjectTree } from './ObjectTree';

export default class GUI {

    public static init(): void {
        GUI.initSideBar();
    }

    private static initSideBar(): void {
        ObjectTree.generateTree();
    }
}
