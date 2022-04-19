import {Camera, Scene, WebGLRenderer} from 'three';
import {Events, ProxyThreeVar, RawThreeVar} from '../types/types';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';



export default class Constant {
    static get CONTROL(): OrbitControls {
        return this._CONTROL;
    }

    static set CONTROL(value: OrbitControls) {
        this._CONTROL = value;
    }

    private static _proxyVar: ProxyThreeVar;
    private static _rawVar: RawThreeVar;
    private static _MENU_CONTAINER: HTMLDivElement;
    private static _LEFT_SIDE_BAR_CONTAINER: HTMLDivElement;
    private static _PANE_CONTAINER: HTMLDivElement;

    private static _CONTROL: OrbitControls;


    static get rawVar(): RawThreeVar {
        return this._rawVar;
    }

    static set rawVar(value: RawThreeVar) {
        this._rawVar = value;
    }

    static set proxyVar(value: ProxyThreeVar) {
        this._proxyVar = value;
    }

    static get proxyVar(): ProxyThreeVar {
        return this._proxyVar;
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
