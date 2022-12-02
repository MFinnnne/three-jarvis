import {Pane} from 'tweakpane';
import {Camera, Group, Object3D, Scene, Vector3, WebGLRenderer} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {TransformControls} from "three/examples/jsm/controls/TransformControls";

export interface ControlPane {
    genPane(argument: Object3D | Camera | WebGLRenderer): Pane;

    update(): void;
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
    object?: Object3D;
    name?: string;

    exec(): void;

    undo(): void;
}

export type RawThreeVar = {
    scene: Scene;
    render: WebGLRenderer;
    camera: Camera | Camera[];
    container: HTMLElement;
    control: OrbitControls;
    transformControls: TransformControls;
};

export type LoadModelConfig = {
    id: string,
    name: string,
    position: { x: number, y: number, z: number },
    scale: { x: number, y: number, z: number },
    rotation: { x: number, y: number, z: number, order?: string },
    quaternion: { x: number, y: number, z: number, w: number },
    afterRender: (object: Object3D | Group) => void
    beforeRender: () => void
}

export  type LoadConfig = {
    loadModelConfigs: LoadModelConfig[],
    beforeLoad: () => void,
    afterLoad: (objects:Object3D[]) => void
}
