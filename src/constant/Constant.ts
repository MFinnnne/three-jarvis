import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {TransformControls} from "three/examples/jsm/controls/TransformControls";
import {RawThreeVar} from "core/Type";

export default class Constant {
    static HELPER_NAME = 'helper';

    static get CONTROL(): OrbitControls {
        return this._CONTROL;
    }

    static set CONTROL(value: OrbitControls) {
        this._CONTROL = value;
    }

    private static _rawVar: RawThreeVar;
    private static _MENU_CONTAINER: HTMLDivElement;
    private static _LEFT_SIDE_BAR_CONTAINER: HTMLDivElement;
    private static _PANE_CONTAINER: HTMLDivElement;
    private static _TRANSFORM_CONTROL:TransformControls;

    private static _CONTROL: OrbitControls;


    static get TRANSFORM_CONTROL(): TransformControls {
        return this._TRANSFORM_CONTROL;
    }

    static set TRANSFORM_CONTROL(value: TransformControls) {
        this._TRANSFORM_CONTROL = value;
    }

    static get rawVar(): RawThreeVar {
        return this._rawVar;
    }

    static set rawVar(value: RawThreeVar) {
        this._rawVar = value;
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
