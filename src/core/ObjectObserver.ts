import {Camera, Object3D, Scene, WebGLRenderer} from "three";

export default class ObjectObserver {

    private readonly _propertyName:string;

    private readonly _propertyValue:string;

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

}

