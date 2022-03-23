import { Camera, Scene } from 'three';

export default class Constant {
    private static _CAMERA: Camera;
    private static _SCENE: Scene;
    private static _CONTAINER: HTMLElement;

    static get CAMERA(): Camera {
        return this._CAMERA;
    }

    static set CAMERA(value: Camera) {
        this._CAMERA = value;
    }

    static get SCENE(): Scene {
        return this._SCENE;
    }

    static set SCENE(value: Scene) {
        this._SCENE = value;
    }

    static get CONTAINER(): HTMLElement {
        return this._CONTAINER;
    }

    static set CONTAINER(value: HTMLElement) {
        this._CONTAINER = value;
    }
}
