import { Emitter } from './emitter';
import { Value, ValueChangeOptions, ValueEvents } from './value';
export declare class PrimitiveValue<T> implements Value<T> {
    readonly emitter: Emitter<ValueEvents<T>>;
    private value_;
    constructor(initialValue: T);
    get rawValue(): T;
    set rawValue(value: T);
    setRawValue(value: T, options?: ValueChangeOptions): void;
}
