import {Scene} from "three";
import {VNode} from "million";
import VirtualDOM from "./VirtualDOM";
import {Object3DTree} from "../app/Object3DTree";
import {spawn, Thread} from "threads";


export default class SceneObserver {

    private static PREV_NODE: VNode | null = null;
    static sec: number = 0;

    static async monitorScene(scene: Scene) {
        const test = await spawn(new Worker("./worker/SceneObserWorker"));
        const hello = await test.hello();
        console.log("worker", hello);
        await Thread.terminate(hello);
        setInterval(() => {
            const vnode = VirtualDOM.object2VNodeTree(scene);
            Object3DTree.render(vnode, this.PREV_NODE);
            SceneObserver.PREV_NODE = vnode;
        }, 500)

    }
}
