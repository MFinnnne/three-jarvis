import { Camera, Object3D, Scene, WebGLRenderer } from 'three';

export default class ObjectObserver {
    private readonly _propertyName: string;

    private readonly _propertyValue: string;

    private _afterAdd: (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void = () => {};
    private _beforeAdd: (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void = () => {};
    private _beforeRender: (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void = () => {};
    private _afterRender: (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void = () => {};

    set beforeAdd(value: (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void) {
        this._beforeAdd = value;
    }

    get beforeAdd(): (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void {
        return this._beforeAdd;
    }

    get afterAdd(): (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void {
        return this._afterAdd;
    }

    set afterAdd(value: (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void) {
        this._afterAdd = value;
    }

    set beforeRender(value: (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void) {
        this._beforeRender = value;
    }

    get beforeRender(): (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void {
        return this._beforeRender;
    }

    set afterRender(value: (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void) {
        this._afterRender = value;
    }

    get afterRender(): (object: Object3D, renderer: WebGLRenderer, scene: Scene, camera: Camera) => void {
        return this._afterRender;
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
}
