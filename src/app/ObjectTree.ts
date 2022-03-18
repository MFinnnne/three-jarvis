import { Object3D, Scene } from 'three';
import { Attributes } from '../core/VDOM';
import $ from 'jquery';
import { Config } from '../config/config';
import ThreeParams from '../constant/ThreeParams';

/**
 *  discard
 */
export type ModelVDomData = {
    name: string;
    uuid: string;
    model: Object3D;
    child?: ModelVDomData[];
    parent?: ModelVDomData | null;
    attributes?: Attributes;
};



/**
 * Generate a model tree
 */
export class ObjectTree {



}
