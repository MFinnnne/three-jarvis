import Constant from "../constant/Constant";
import ObjectTree from "./ObjectTree";
import MenuBar from "./menu/MenuBar";
import { Scene } from "three";
import Jarvis from "../core/Jarvis";
import { clickObjectEvent } from "../core/events/ObjectEvents";

export default class GUI {
    public static guiContainerInit(creator: Jarvis): void {
        const container = document.querySelector("#three-helper-container");
        container && container.remove();
        const element = document.createElement("div");
        element.id = "three-helper-container";
        element.className = "three-helper-container";

        const promptContainer = document.createElement("div");
        promptContainer.className = "prompt-container";
        element.appendChild(promptContainer);

        const menuDom = document.createElement("div");
        menuDom.id = "three-helper-menu";
        menuDom.className = "three-helper-menu";
        element.appendChild(menuDom);

        const leftSideBarDom = document.createElement("div");
        leftSideBarDom.id = "three-helper-left-side-bar";
        leftSideBarDom.className = "three-helper-left-side-bar";
        element.appendChild(leftSideBarDom);
        Constant.LEFT_SIDE_BAR_CONTAINER = leftSideBarDom;

        const paneDom = document.createElement("div");
        paneDom.id = "three-helper-pane";
        paneDom.className = "three-helper-pane";
        element.appendChild(paneDom);
        Constant.PANE_CONTAINER = paneDom;
        document.body.appendChild(element);
        MenuBar.render(menuDom);
        const objectTree = new ObjectTree(leftSideBarDom, creator);
        clickObjectEvent(objectTree);
    }
}
