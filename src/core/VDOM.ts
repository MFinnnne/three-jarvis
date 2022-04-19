import {Object3D} from "three";
import Constant from "../constant/Constant";


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

export default class VDOM {
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
        const vNodeTree = VDOM.object2VNode(object3D);
        object3D.children.forEach((child) => {
            const childVNodeTree = VDOM.object2VNode(child);
            childVNodeTree.parent = vNodeTree.self;
            vNodeTree.children?.push(childVNodeTree);
        });
        if (vNodeTree.children?.length) {
            vNodeTree.hasChildren = true;
        }
        return vNodeTree;
    }

    static updateVNodeTree(path: string[], ...objects: Object3D[]) {
        console.log(path, '----', objects)
    }

    static print(vNodeTree: VNodeTree, level = 0) {
        const {self, children} = vNodeTree;
        const {tagName, id, className} = self;
        const indent = '-'.repeat(level * 2);
        console.log(`${indent}${tagName}#${id} ${className}`);
        children?.forEach((child) => {
            VDOM.print(child, level + 1);
        });
    }

    /**
     * parse path to objects
     */
    parseObjectChain(path: string[]) {
        if (path.length === 1) {
            return Constant.proxyVar.scene;
        }
    }
}
