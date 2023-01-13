import {Camera, Object3D, Scene, WebGLRenderer} from "three";

export default class ObjectEventDispatch {
    private readonly _object: Object3D;
    private _isInvoke = false;
    private _afterAdd?: (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void

    private _beforeRender?: (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void
    private _afterRender?: (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void

    set afterAdd(value: (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void) {
        this._afterAdd = value;
    }


    set beforeRender(value: (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void) {
        this._beforeRender = value;
    }

    set afterRender(value: (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void) {
        this._afterRender = value;
    }

    constructor(object: Object3D) {
        this._object = object;
        this.registry();
    }

    registry() {
        this._object.onAfterRender = (renderer, scene, camera) => {
            if (!this._isInvoke) {
                this._afterAdd?.call(this, this._object, renderer, scene, camera);
                this._isInvoke = true;
            }
            this._afterRender?.call(this, this._object, renderer, scene, camera);
        }


        this._object.onBeforeRender = (renderer, scene, camera) => {
            this._beforeRender?.call(this, this._object, renderer, scene, camera);
        }
    }

}

