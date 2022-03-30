import { Object3D } from 'three';

class State {

    private static instance: State;

    private _selected: Object3D = new Object3D();

    get selected(): Object3D {
        return this._selected;
    }

    set selected(value: Object3D) {
        this._selected = value;
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
