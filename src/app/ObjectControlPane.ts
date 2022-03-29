import { Pane } from 'tweakpane';
import { ControlPane } from '../types/types';
import { Object3D } from 'three';
import Constant from '../constant/Constant';

export default class ObjectControlPane implements ControlPane {

    public genPane(object: Object3D): Pane {
        const pane = new Pane({ container: Constant.PANE_CONTAINER });
        return pane;
    }
}
