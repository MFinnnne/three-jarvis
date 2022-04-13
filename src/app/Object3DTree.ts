import { Object3D } from 'three';
import Constant from '../constant/Constant';
import Ticker from '../core/Ticker';
import state from '../core/State';

export type VNode = {
    tagName: string;
    id: string;
    className: string;
    value: string;
    uuid: string;
    style?: Partial<CSSStyleDeclaration>;
};

export type VNodeTree = {
    self: VNode;
    children?: VNodeTree[];
    parent?: VNode;
    hasChildren: boolean;
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
        const vNodeTree = Object3DTree.threeObject2VNodeTree(Constant.SCENE);
        const modelTreeDOM = Object3DTree.vNodeTree2DOM(vNodeTree);
        Constant.LEFT_SIDE_BAR_CONTAINER.appendChild(modelTreeDOM);
        const toggle = document.getElementsByClassName('caret');
        for (let i = 0; i < toggle.length; i++) {
            toggle[i].addEventListener('click', function (e) {
                const parentElement = (e.target as HTMLElement).parentElement;
                const element = parentElement?.querySelector('.nested');
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

    /**
     * find dom in tree and expand
     * @param element
     */
    static expandTreeByChildNode(element: HTMLElement) {
        let divElement = element.parentElement?.parentElement?.parentElement;
        while (divElement) {
            const classList = divElement.querySelector('.nested')?.classList;
            if (!classList?.contains('active')) {
                classList?.toggle('active');
            }
            if (divElement.className === 'scene') {
                break;
            }
            divElement = divElement.parentElement?.parentElement;
        }
    }

    static lazyLoad(element: HTMLElement) {
        console.log(element);
    }

    /**
     * find dom in three and auto scroll to it
     * @param dom
     */
    static autoLocateInTree(dom: HTMLElement) {
        state.selectedObjectDom.classList.toggle('find-out');
        dom.classList.toggle('find-out');
        state.selectedObjectDom = dom;
        let offsetTop: number = dom.offsetTop - Constant.LEFT_SIDE_BAR_CONTAINER.clientHeight / 2;
        if (dom.offsetTop < Constant.LEFT_SIDE_BAR_CONTAINER.clientHeight) {
            offsetTop = 0;
        }
        let offsetLeft: number = dom.offsetLeft - Constant.LEFT_SIDE_BAR_CONTAINER.clientWidth / 2;
        if (dom.offsetLeft < Constant.LEFT_SIDE_BAR_CONTAINER.clientWidth / 4) {
            offsetLeft = 0;
        }
        Constant.LEFT_SIDE_BAR_CONTAINER.scrollTo(offsetLeft, offsetTop);
    }

    static object2VNode(object3D: Object3D) {
        const vNodeTree: VNodeTree = {
            self: {
                tagName: 'div',
                id: object3D.uuid,
                className: object3D.name === '' ? object3D.type : object3D.name,
                value: object3D.name === '' ? object3D.type : object3D.name,
                uuid: object3D.uuid,
            },
            children: [],
            hasChildren: false,
        };
        return vNodeTree;
    }

    static threeObject2VNodeTree(object3D: Object3D): VNodeTree {
        const vNodeTree = Object3DTree.object2VNode(object3D);
        object3D.children.forEach((child) => {
            const childVNodeTree = Object3DTree.object2VNode(child);
            childVNodeTree.parent = vNodeTree.self;
            vNodeTree.children?.push(childVNodeTree);
        });
        if (vNodeTree.children?.length) {
            vNodeTree.hasChildren = true;
        }
        return vNodeTree;
    }

    static print(vNodeTree: VNodeTree, level = 0) {
        const { self, children } = vNodeTree;
        const { tagName, id, className } = self;
        const indent = '-'.repeat(level * 2);
        console.log(`${indent}${tagName}#${id} ${className}`);
        children?.forEach((child) => {
            Object3DTree.print(child, level + 1);
        });
    }
}
