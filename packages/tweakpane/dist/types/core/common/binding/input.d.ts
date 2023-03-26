import { Emitter } from '../model/emitter';
import { Value, ValueChangeOptions } from '../model/value';
import { BindingReader, BindingWriter } from './binding';
import { BindingTarget } from './target';
interface Config<In> {
    reader: BindingReader<In>;
    target: BindingTarget;
    value: Value<In>;
    writer: BindingWriter<In>;
}
/**
 * @hidden
 */
export interface InputBindingEvents<In> {
    change: {
        options: ValueChangeOptions;
        rawValue: In;
        sender: InputBinding<In>;
    };
}
/**
 * @hidden
 */
export declare class InputBinding<In> {
    readonly emitter: Emitter<InputBindingEvents<In>>;
    readonly target: BindingTarget;
    readonly value: Value<In>;
    readonly reader: (exValue: unknown) => In;
    readonly writer: BindingWriter<In>;
    constructor(config: Config<In>);
    read(): void;
    private write_;
    setValue(rawValue: In, isEmitt?: boolean): void;
    private onValueChange_;
}
export {};