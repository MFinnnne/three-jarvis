import { Command } from '../Type';
import { Object3D } from 'three';

export default class SetPropertyCommand implements Command {
    name = 'set property';
    object: Object3D;
    private readonly _propertyName: string;
    private _value: any;

    private _oldValue: any;

    constructor(object: Object3D, propertyName: string, value: any) {
        this.object = object;
        this._propertyName = propertyName;
        this._value = value;
    }

    exec(): void {
        this._oldValue = this.object[this._propertyName];
        this.object[this._propertyName] = this._value;
    }

    undo(): void {
        this.object[this._propertyName] = this._oldValue;
    }
}
