import { ModelVDomData } from '../app/LeftSideBar';
import { Object3D } from 'three';
import style from './Style';

/**
 * this class is discard;
 */

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
            value: '',
            uuid: '',
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
            hasChildren: !!vNodeTrees,
        };
    }

    static threeScene2VNodeTree(object3D: Object3D): VNodeTree {
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
        object3D.children.forEach((child) => {
            const childVNodeTree = VDOM.threeScene2VNodeTree(child);
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
            VDOM.print(child, level + 1);
        });
    }
}
