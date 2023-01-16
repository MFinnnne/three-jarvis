import {Camera, Object3D, Scene, WebGLRenderer} from "three";
import Utils from "../util/Utils";

export default class ObjectEventBus {

    private readonly _propertyName:string;

    private readonly _propertyValue:string;
    private _objects!: Object3D[];
    private _afterAdd?: (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void
    private _beforeRender?: (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void
    private _afterRender?: (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void

    set afterAdd(value: (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void) {
        this._afterAdd = value;
    }


    constructor(propertyName: string, propertyValue: string) {
        this._propertyName = propertyName;
        this._propertyValue = propertyValue;
    }


    get propertyName(): string {
        return this._propertyName;
    }

    get propertyValue(): string {
        return this._propertyValue;
    }

    set beforeRender(value: (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void) {
        this._beforeRender = value;
    }

    set afterRender(value: (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void) {
        this._afterRender = value;
    }

    bind(object: Object3D|Object3D[]) {
        if (object instanceof Array) {
            this._objects=[...object];
        }else{
            this._objects=[object];
        }
        for (const object of this._objects) {
            object.onAfterRender = (renderer, scene, camera) => {
                Utils.once(this._afterAdd).call(this, object, renderer, scene, camera)
                this._afterRender?.call(this, object, renderer, scene, camera);
            }

            object.onBeforeRender = (renderer, scene, camera) => {
                this._beforeRender?.call(this, object, renderer, scene, camera);
            }
        }
    }
}

