import { Object3D } from 'three';
import VDOM, { Attributes, VNodeTree } from '../core/VDOM';
import Constant from '../constant/Constant';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';

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
export class ObjectTree {
    private static initStyle() {
        document.styleSheets[0].insertRule(
            '.caret-over,.caret{ overflow: hidden;white-space: nowrap; cursor:pointer;user-select: none;margin-top:20px}',
            0,
        );

        document.styleSheets[0].insertRule('.caret-over:hover,.caret:hover { background:olive;}', 0);

        document.styleSheets[0].insertRule(
            '.caret::before { content: "\\25B6"; color: #000; display: inline-block; margin-right: 5px; }',
            0,
        );
        document.styleSheets[0].insertRule('.caret-down::before {transform: rotate(90deg);}', 0);

        document.styleSheets[0].insertRule('.active {display: block;}', 0);

        document.styleSheets[0].insertRule('.nested {display: none; padding-inline-start: 20px;margin:0px}', 0);
    }

    public static generateTree() {
        ObjectTree.initStyle();
        const vNodeTree = VDOM.threeScene2VNodeTree(Constant.SCENE);
        const modelTreeDOM = ObjectTree.vNodeTree2DOM(vNodeTree);
        Constant.CONTAINER.appendChild(modelTreeDOM);

        const toggle = document.getElementsByClassName('caret');
        for (let i = 0; i < toggle.length; i++) {
            toggle[i].addEventListener('click', function (e) {
                const parentElement = (e.target as HTMLElement).parentElement;
                parentElement?.querySelector('.nested')?.classList.toggle('active');
                (e.target as HTMLElement).classList.toggle('caret-down');
            });
        }
    }

    static vNodeTree2DOM(vNodeTree: VNodeTree): HTMLElement {
        const { self, children } = vNodeTree;
        const { tagName, id, className, style } = self;
        const element = document.createElement(tagName);
        element.id = id;
        element.className = className;

        const spanElement = document.createElement('span');
        spanElement.innerHTML = vNodeTree.self.value;
        if (vNodeTree.hasChildren) {
            spanElement.className = 'caret';
        } else {
            spanElement.className = 'caret-over';
        }
        spanElement.className += ' three-object';
        element.appendChild(spanElement);

        const nestedEle = document.createElement('ul');
        nestedEle.className = 'nested';
        element.appendChild(nestedEle);
        children?.forEach((child) => {
            nestedEle.appendChild(ObjectTree.vNodeTree2DOM(child));
        });
        return element;
    }

    static nodeEvent() {
        const objects = document.getElementsByClassName('three-object');

        for (let i = 0; i < objects.length; i++) {
            objects[i].addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const uuid = target.parentElement?.id;
                if (uuid) {
                    const model = Constant.SCENE.getObjectByProperty('uuid', uuid);
                    if (model) {
                        // if(model.type===)
                    }
                }
            });
        }
    }
}
