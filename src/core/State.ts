import { Camera, Object3D, PerspectiveCamera } from "three";
import Constant from "../constant/Constant";
import ObjectTree from "../app/ObjectTree";
import TransformControlComponent from "./component/TransformControlComponent";
import { domClickEvent } from "./events/DomEvents";

class State {
    private static instance: State;

    private _selectedObject: Object3D = new Object3D();
    private _selectedObjectDom: HTMLElement = document.createElement("div");
    private _activeCamera: Camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    get activeCamera(): Camera {
        return this._activeCamera;
    }

    set activeCamera(value: Camera) {
        this._activeCamera = value;
        if (this._activeCamera instanceof PerspectiveCamera) {
            this._activeCamera.updateProjectionMatrix();
        }
    }

    get selectedObjectDom(): HTMLElement | null {
        return this._selectedObjectDom;
    }

    set selectedObjectDom(value: HTMLElement | null) {
        if (value == null) {
            this._selectedObjectDom = document.createElement("div");
            return;
        }
        this._selectedObjectDom.classList.toggle("selected");
        this._selectedObjectDom = value;
        this._selectedObjectDom.classList.toggle("selected");
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
