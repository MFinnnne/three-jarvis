import { Emitter } from './emitter';
import { Value, ValueChangeOptions, ValueEvents } from './value';
export type SetRawValue<T> = (rawValue: T, options?: ValueChangeOptions | undefined) => void;
export declare class ReadonlyValue<T> {
    private value_;
    constructor(value: Value<T>);
    static create<T>(value: Value<T>): [ReadonlyValue<T>, SetRawValue<T>];
    /**
     * The event emitter for value changes.
     */
    get emitter(): Emitter<ValueEvents<T>>;
    /**
     * The raw value of the model.
     */
    get rawValue(): T;
}
