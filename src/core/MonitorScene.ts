import {Object3D, Scene} from 'three';
import DeepProxy from "proxy-deep";


export default class MonitorScene {
    sceneProxy?: Scene;
    constructor(scene: Scene) {
        this.sceneProxy = new DeepProxy(scene, {
            apply(target: Scene, thisArg: any, argArray?: any): any {
                debugger
                console.log(thisArg);
            }
        })
    }

    add(...objects:Object3D[]){
        this.sceneProxy?.add(...objects)
    }
}
