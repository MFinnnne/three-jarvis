import { Box3, Object3D, Sphere } from 'three';
import state from './State';
import HelperManager from './HelperManager';
import Jarvis from './Jarvis';

export default class ObjectChanged {
    private static instance?: ObjectChanged;
    private jarvis!: Jarvis;

    /**
     *   boxed  mesh
     */
    private constructor() {}

    public static getInstance(jarvis?: Jarvis): ObjectChanged {
        if (jarvis) {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ObjectChanged();
            this.instance.jarvis = jarvis;
            return this.instance;
        } else {
            if (this.instance === undefined) {
                throw new Error('object changed is null ');
            }
            return this.instance;
        }
    }

    public objectHelper(object: Object3D): void {
        this.jarvis.state.selectedObject = object;
        if (object.type === 'Scene') {
            return;
        }
        this.jarvis.transformControl.attach(object);
        HelperManager.render(object, this.jarvis.scene);
        return;
    }

    public update(target?: Object3D): void {
        const object = target ?? this.jarvis.state.selectedObject;
        if (object == null) {
            return;
        }
        if (this.jarvis.state.selectedObject.uuid === object.uuid) {
            this.objectHelper(object);
        }
    }
}
