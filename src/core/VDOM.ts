import {ModelVDomData} from "../app/ObjectTree";


export interface VNode {
    tagName: string;
    id: string;
    className: string;
    style: string;
}


export interface VNodeTree {
    self: VNode;
    children: VNodeTree[];
    parent?: VNode;
}

export default class VDOM {
    static createVNode(tagName: string, props: { [key: string]: string }): VNode {
        return {
            tagName,
            id: props.id,
            className: props.className,
            style: props.style ?? null
        }
    }

    static parseModelDataTree(modelVDomData: ModelVDomData): VNodeTree {
        const {uuid, name} = modelVDomData;
        const curVNode = VDOM.createVNode('div', {className: name, id: uuid});
        const vNodeTrees = modelVDomData.child.map(child => VDOM.parseModelDataTree(child));
        vNodeTrees.forEach(vNodeTree => {
            vNodeTree.parent = curVNode;
        });
        return {
            self: curVNode,
            children: vNodeTrees,
        };
    }
}
