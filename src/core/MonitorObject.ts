import { Scene, WebGLRenderer } from 'three';
import DeepProxy from 'proxy-deep';
import VDOM from './VDOM';

class MonitorObject {
    monitorScene(scene: Scene): Scene {
        return new DeepProxy<Scene>(scene, {
            get(target: Scene, p: PropertyKey, receiver: any): any {
                console.log(p);
                return this.nest(function () {});
            },
            set(target: Scene, p: PropertyKey, value: any, receiver: any): boolean {
                console.log('set----', p);
                return true;
            },
            apply(target: Scene, thisArg: any, argArray?: any): any {
                if (this.path[this.path.length - 1] === 'add') {
                    VDOM.updateVNodeTree(this.path, argArray);
                }
            },
        });
    }

    monitorRender(render: WebGLRenderer) {
        return new DeepProxy<WebGLRenderer>(render, {
            get(target: WebGLRenderer, p: PropertyKey, receiver: any): any {
                return this.nest(function () {});
            },
            apply(target: WebGLRenderer, thisArg: any, argArray?: any): any {},
        });
    }
}

const monitorObject = new MonitorObject();
export default monitorObject;
