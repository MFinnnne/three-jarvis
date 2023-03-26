import { Constraint } from '../constraint/constraint';
import { Emitter } from './emitter';
import { Value, ValueChangeOptions, ValueEvents } from './value';
interface Config<T> {
    constraint?: Constraint<T>;
    equals?: (v1: T, v2: T) => boolean;
}
export declare class BoundValue<T> implements Value<T> {
    readonly emitter: Emitter<ValueEvents<T>>;
    private readonly constraint_;
    private readonly equals_;
    private rawValue_;
    constructor(initialValue: T, config?: Config<T>);
    get constraint(): Constraint<T> | undefined;
    get rawValue(): T;
    set rawValue(rawValue: T);
    setRawValue(rawValue: T, options?: ValueChangeOptions): void;
}
export {};
