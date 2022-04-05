import { Pane } from 'tweakpane';
import { Camera, Object3D, WebGLRenderer } from 'three';

export interface ControlPane {
    genPane(argument: Object3D | Camera | WebGLRenderer): Pane;
}

export interface Events {
    objectDomClick: (id: string) => void;
    objectDomDoubleClick: (id: string) => void;
    objectClick: (object3D: Object3D) => void;
    objectDoubleClick: (object3D: Object3D) => void;
    objectHover: (object3D: Object3D) => void;
    objectOut: (object3D: Object3D) => void;
    cameraDomClick: () => void;
    renderDomClick: () => void;
    lockObject: (object3d: Object3D) => void;
}

export interface Command {
    object: Object3D;
    name?: string;

    exec(): void;

    undo(): void;
}

