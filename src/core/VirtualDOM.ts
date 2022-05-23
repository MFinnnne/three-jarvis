import {className, Flags, m, VElement, VNode} from 'million';
import {Object3D} from "three";

export default class VirtualDOM {

    static object2VNode(object: Object3D): VElement {
        const node: VElement = {
            flag: Flags.ELEMENT,
            tag: 'div',
            props: {
                className: object.name === '' ? object.type : object.name,
                uuid: object.uuid,
                parent: null,
                hasChildren: object.children.length > 0
            },
            children: [
                m('span', {
                    id: object.uuid,
                    className: className({
                        caret: object.children.length > 0,
                        caretOver: object.children.length <= 0,
                        threeObject: true,
                    }),
                    onClick: (e) => {
                        console.log(e);
                    }
                }, [object.name === '' ? object.type : object.name], Flags.ELEMENT_TEXT_CHILDREN),
            ],
            key: object.uuid
        };
        if (object.children.length > 0) {
            node.children?.push({
                tag: 'ul',
                props: {className: className({nested: true})},
                children: [],
                flag: Flags.ELEMENT
            });
        }
        return node;
    }

    static object2VNodeTree(object: Object3D): VElement {
        const node = VirtualDOM.object2VNode(object);
        object.children.forEach(child => {
            const childNode: VNode = VirtualDOM.object2VNodeTree(child);
            if (node.children?.length === 2) {
                if (childNode.props) {
                    childNode.props.parent = node;
                }
                const ulNode = node.children[1] as VElement;
                ulNode.children?.push(childNode)
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
