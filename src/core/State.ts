import { Camera, Object3D, OrthographicCamera, PerspectiveCamera } from 'three';
import Constant from '../constant/Constant';
import * as THREE from 'three';

class State {
    private static instance: State;

    private _selectedObject: Object3D = new Object3D();
    private _selectedObjectDom: HTMLElement = document.createElement('div');
    private _activeCamera: Camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    private _cameras: Camera[] = [];

    get activeCamera(): Camera {
        return this._activeCamera;
    }

    set activeCamera(value: Camera) {
        const camera = value.clone(true);
        this._cameras.push(camera);
        this._activeCamera = value;
        this._activeCamera.layers.enableAll();
        this._activeCamera.position.copy(camera.position);
        Constant.CONTROL.object = this._activeCamera;
        if (this._activeCamera instanceof PerspectiveCamera) {
            this._activeCamera.updateProjectionMatrix();
        }
    }

    get selectedObjectDom(): HTMLElement {
        return this._selectedObjectDom;
    }

    set selectedObjectDom(value: HTMLElement) {
        this._selectedObjectDom = value;
    }

    get selectedObject(): Object3D {
        return this._selectedObject;
    }

    set selectedObject(value: Object3D) {
        this._selectedObject = value;
    }

    public static getInstance(): State {
        if (!State.instance) {
            State.instance = new State();
        }
        return State.instance;
    }
}

const state = new State();
export default state;
