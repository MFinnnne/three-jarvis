import { Emitter } from './emitter';
import { Value } from './value';
export interface ValueMapEvents<O extends Record<string, unknown>> {
    change: {
        key: keyof O;
        sender: ValueMap<O>;
    };
}
export declare type ValueMapCore<O extends Record<string, unknown>> = {
    [Key in keyof O]: Value<O[Key]>;
};
export declare class ValueMap<O extends Record<string, unknown>> {
    readonly emitter: Emitter<ValueMapEvents<O>>;
    private readonly valMap_;
    constructor(valueMap: ValueMapCore<O>);
    static createCore<O extends Record<string, unknown>>(initialValue: O): ValueMapCore<O>;
    static fromObject<O extends Record<string, unknown>>(initialValue: O): ValueMap<O>;
    get<Key extends keyof O>(key: Key): O[Key];
    set<Key extends keyof O>(key: Key, value: O[Key]): void;
    value<Key extends keyof O>(key: Key): Value<O[Key]>;
}
