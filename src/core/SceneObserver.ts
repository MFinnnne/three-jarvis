import {Object3D, Scene} from "three";
import GUI from "../app/GUI";
import Constant from "../constant/Constant";
import Utils from "../util/Utils";
import {createElement, VElement, VNode} from "million";
import VirtualDOM from "./VirtualDOM";
import {Object3DTree} from "../app/Object3DTree";


export default class SceneObserver {

    private static PREV_NODE: VNode | null = null;

    static monitorScene(scene: Scene) {
        setInterval(()=>{
            const vnode = VirtualDOM.object2VNodeTree(scene);
            Object3DTree.render(vnode, this.PREV_NODE);
            this.PREV_NODE = vnode;
        },500)

    }
}
