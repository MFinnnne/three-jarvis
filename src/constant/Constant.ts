import { Camera, Scene } from 'three';

export default class Constant {
    private static _CAMERA: Camera;
    private static _SCENE: Scene;
    private static _CONTAINER: HTMLElement;
    private static _MENU_CONTAINER: HTMLDivElement;
    private static _LEFT_SIDE_BAR_CONTAINER: HTMLDivElement;
    private static _PANE_CONTAINER: HTMLDivElement;

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

    static get MENU_CONTAINER(): HTMLDivElement {
        return this._MENU_CONTAINER;
    }

    static set MENU_CONTAINER(value: HTMLDivElement) {
        this._MENU_CONTAINER = value;
    }

    static get LEFT_SIDE_BAR_CONTAINER(): HTMLDivElement {
        return this._LEFT_SIDE_BAR_CONTAINER;
    }

    static set LEFT_SIDE_BAR_CONTAINER(value: HTMLDivElement) {
        this._LEFT_SIDE_BAR_CONTAINER = value;
    }


    static get PANE_CONTAINER(): HTMLDivElement {
        return this._PANE_CONTAINER;
    }

    static set PANE_CONTAINER(value: HTMLDivElement) {
        this._PANE_CONTAINER = value;
    }
}
