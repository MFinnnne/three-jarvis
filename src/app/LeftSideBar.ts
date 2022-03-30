import { Object3D } from 'three';
import VDOM, { Attributes, VNodeTree } from '../core/VDOM';
import Constant from '../constant/Constant';
import Ticker from '../core/Ticker';
import EventRegistry from '../core/EventRegistry';
import { Pane } from 'tweakpane';
import ObjectChanged from '../core/ObjectChanged';
import ObjectControlPane from './ObjectControlPane';
import State from '../core/State';
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
export class LeftSideBar {
    public static init() {
        LeftSideBar.registryEvent();
        LeftSideBar.generateTree();
        this.objectDomClickEvent();
    }

    static generateTree() {
        const vNodeTree = VDOM.threeScene2VNodeTree(Constant.SCENE);
        const modelTreeDOM = LeftSideBar.vNodeTree2DOM(vNodeTree);
        Constant.LEFT_SIDE_BAR_CONTAINER.appendChild(modelTreeDOM);
        const toggle = document.getElementsByClassName('caret');
        for (let i = 0; i < toggle.length; i++) {
            toggle[i].addEventListener('click', function(e) {
                const parentElement = (e.target as HTMLElement).parentElement;
                parentElement?.querySelector('.nested')?.classList.toggle('active');
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

        const nestedEle = document.createElement('ul');
        nestedEle.className = 'nested';
        element.appendChild(nestedEle);
        children?.forEach((child) => {
            nestedEle.appendChild(LeftSideBar.vNodeTree2DOM(child));
        });
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

    static registryEvent() {
        let instance: Pane;
        EventRegistry.registry('objectDomClick', (value => {
            instance && instance.dispose();
            const id = value[0];
            const obj = Constant.SCENE.getObjectByProperty('uuid', id);
            if (!obj) {
                throw new Error(`object3d(uuid:${id}) is not in scene`);
            }
            ObjectChanged.getInstance().highLightMesh(obj);
            state.selected = obj;
            instance = new ObjectControlPane().genPane(obj);
        }));
    }
}
