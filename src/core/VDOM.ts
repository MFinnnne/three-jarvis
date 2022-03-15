import { ModelVDomData } from '../app/ObjectTree';

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
}

export default class VDOM {
    static createVNode(tagName: string, attributes: Attributes): VNode {
        return {
            tagName,
            id: attributes.id,
            className: attributes.className,
            style: attributes.style,
        };
    }

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
