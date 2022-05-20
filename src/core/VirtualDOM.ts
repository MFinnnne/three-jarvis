import {Flags, VElement, VNode} from 'million';
import {Object3D} from "three";

export default class VirtualDOM {

    static object2VNode(object: Object3D): VElement {
        return {
            tag: 'div',
            props: {
                id: object.uuid,
                className: object.name === '' ? object.type : object.name,
                value: object.name === '' ? object.type : object.name,
                uuid: object.uuid,
                parent: null,
                hasChildren: object.children.length > 0
            },
            children: [], flag: Flags.ELEMENT, key: object.uuid
        }
    }

    static object2VNodeTree(object: Object3D): VElement {
        const node = VirtualDOM.object2VNodeTree(object);
        object.children.forEach(child => {
            const childNode: VNode = VirtualDOM.object2VNode(child);
            node.children?.push(childNode)
            if (childNode.props) {
                childNode.props.parent = node;
            }
        })
        return node;
    }

    static print(vNode: VElement, level = 0) {
        const props = vNode.props;
        if (!props) {
            return;
        }
        const indent = '-'.repeat(level * 2);
        console.log(`${indent}${props.value}#${props.id} ${props.value}`);
        vNode.children?.forEach((child) => {
            VirtualDOM.print(child as VElement, level + 1);
        });
    }
}
