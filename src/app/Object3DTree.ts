import { Object3D } from 'three';
import VDOM, { Attributes, VNodeTree } from '../core/VDOM';
import Constant from '../constant/Constant';
import Ticker from '../core/Ticker';
import state from '../core/State';

/**
 *  discard
 */
export type ModelVDomData = {
    name: string;
    uuid: string;
    model: Object3D;
    child?: ModelVDomData[];
    parent?: ModelVDomData | null;
    attributes?: Attributes;
};

/**
 * Generate a model tree
 */
export class Object3DTree {
    public static init() {
        Object3DTree.generateTree();
        this.objectDomClickEvent();
    }

    static generateTree() {
        const vNodeTree = VDOM.threeScene2VNodeTree(Constant.SCENE);
        const modelTreeDOM = Object3DTree.vNodeTree2DOM(vNodeTree);
        Constant.LEFT_SIDE_BAR_CONTAINER.appendChild(modelTreeDOM);
        const toggle = document.getElementsByClassName('caret');
        for (let i = 0; i < toggle.length; i++) {
            toggle[i].addEventListener('click', function(e) {
                const parentElement = (e.target as HTMLElement).parentElement;
                let element = parentElement?.querySelector('.nested');
                element?.classList.toggle('active');
                (e.target as HTMLElement).classList.toggle('caret-down');
            });
        }
    }

    static vNodeTree2DOM(vNodeTree: VNodeTree): HTMLElement {
        const { self, children } = vNodeTree;
        const { tagName, id, className } = self;
        const element = document.createElement(tagName);
        element.className = className;
        const spanElement = document.createElement('span');
        spanElement.id = id;
        spanElement.innerHTML = vNodeTree.self.value;
        if (vNodeTree.hasChildren) {
            spanElement.className = 'caret';
        } else {
            spanElement.className = 'caret-over';
        }
        spanElement.className += ' three-object';
        element.appendChild(spanElement);

        if (vNodeTree.hasChildren) {
            const nestedEle = document.createElement('ul');
            nestedEle.className = 'nested';
            element.appendChild(nestedEle);
            children?.forEach((child) => {
                nestedEle.appendChild(Object3DTree.vNodeTree2DOM(child));
            });
        }
        return element;
    }

    static objectDomClickEvent() {
        const objects = document.getElementsByClassName('three-object');
        for (let i = 0; i < objects.length; i++) {
            objects[i].addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const uuid = target.id;
                Ticker.emmit('objectDomClick', uuid);
            });
        }
    }

    static expandTreeByChildNode(element: HTMLElement) {
        let divElement = element.parentElement?.parentElement?.parentElement;
        while (divElement) {
            let classList = divElement.querySelector('.nested')?.classList;
            if (!classList?.contains('active')) {
                classList?.toggle('active');
            }
            if (divElement.className === 'scene') {
                break;
            }
            divElement = divElement.parentElement?.parentElement;
        }
        Object3DTree.autoLocateInTree(element);
    }

    private static autoLocateInTree(dom: HTMLElement) {
        state.selectedObjectDom.classList.toggle('selected');
        dom.classList.toggle('selected');
        state.selectedObjectDom = dom;
        let offsetTop: number = dom.offsetTop - Constant.LEFT_SIDE_BAR_CONTAINER.clientHeight / 2;
        if (dom.offsetTop < Constant.LEFT_SIDE_BAR_CONTAINER.clientHeight) {
            offsetTop = 0;
        }
        let offsetLeft: number = dom.offsetLeft - Constant.LEFT_SIDE_BAR_CONTAINER.clientWidth / 2;
        if (dom.offsetLeft < Constant.LEFT_SIDE_BAR_CONTAINER.clientWidth / 2) {
            offsetLeft = 0;
        }
        // Constant.LEFT_SIDE_BAR_CONTAINER.addEventListener('scroll',(e)=>{
        //     console.log(((e.target) as HTMLElement).scrollTop);
        // })
        Constant.LEFT_SIDE_BAR_CONTAINER.scrollTo(offsetLeft,offsetTop);
    }
}