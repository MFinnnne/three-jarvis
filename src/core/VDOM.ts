import { ModelVDomData } from '../app/ObjectTree';
import { Object3D } from 'three';
import style from './Style';

/**
 * this class is discard;
 */


export type VNode = {
    tagName: string;
    id: string;
    className: string;
    style?: Partial<CSSStyleDeclaration>;
};

export type VNodeTree = {
    self: VNode;
    children?: VNodeTree[];
    parent?: VNode;
};

export type Attributes = {
    className: string;
    style?: Partial<CSSStyleDeclaration>;
    id: string;
};

export default class VDOM {
    static createVNode(tagName: string, attributes: Attributes): VNode {
        return {
            tagName,
            id: attributes.id,
            className: attributes.className,
            style: attributes.style,
        };
    }

    /**
     *Discard function
     */
    static parseModelDataTree(modelVDomData: ModelVDomData): VNodeTree {
        const { uuid, name, attributes } = modelVDomData;
        const curVNode = VDOM.createVNode('div', { className: name, id: uuid, ...attributes });
        const vNodeTrees = modelVDomData.child?.map((child) => VDOM.parseModelDataTree(child));
        vNodeTrees?.forEach((vNodeTree) => {
            vNodeTree.parent = curVNode;
        });
        return {
            self: curVNode,
            children: vNodeTrees,
        };
    }

    static threeScene2VNodeTree(object3D: Object3D): VNodeTree {

        const vNodeTree: VNodeTree = {
            self: {
                tagName: 'div',
                id: object3D.uuid,
                className: object3D.name === '' ? object3D.type : object3D.name,
                style: style.getStyleByModelType(object3D),
            },
            children: [],
        };
        object3D.children.forEach((child) => {
            const childVNodeTree = VDOM.threeScene2VNodeTree(child);
            childVNodeTree.parent = vNodeTree.self;
            vNodeTree.children?.push(childVNodeTree);
        });
        return vNodeTree;
    }

    static render(vNodeTree: VNodeTree): HTMLElement {
        const { self, children } = vNodeTree;
        const { tagName, id, className, style } = self;
        const element = document.createElement(tagName);
        element.id = id;
        element.className = className;
        if (style) {
            Object.keys(style).forEach((key) => {
                element.style[key] = style[key];
            });
        }
        children?.forEach((child) => {
            element.appendChild(VDOM.render(child));
        });
        return element;
    }


    static print(vNodeTree: VNodeTree, level = 0) {
        const { self, children } = vNodeTree;
        const { tagName, id, className } = self;
        const indent = '-'.repeat(level * 2);
        console.log(`${indent}${tagName}#${id} ${className}`);
        children?.forEach((child) => {
            VDOM.print(child, level + 1);
        });
    }

}
