import { Object3D, Scene } from 'three';
import DeepProxy from 'proxy-deep';
import { doc } from 'prettier';
import debug = doc.debug;

class MonitorObject {
    warpScene(scene: Scene): Scene {
        return new DeepProxy<Scene>(scene, {
            get(target: Scene, p: PropertyKey, receiver: any): any {
                return this.nest(function () {});
            },
            apply(target: Scene, thisArg: any, argArray?: any): any {
                return this.path;
            },
        });
    }
}
const monitorObject = new MonitorObject();
export default monitorObject;
