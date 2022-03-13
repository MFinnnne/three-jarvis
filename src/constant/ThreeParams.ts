import { Camera, Scene } from "three";

export default class ThreeParams {
    private static _CAMERA: Camera;
    private static _SCENE: Scene;


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
}
