import { Parser } from '../converter/parser';
import { Value } from '../model/value';
import { ViewProps } from '../model/view-props';
import { TextProps, TextView } from '../view/text';
import { ValueController } from './value';
/**
 * @hidden
 */
export interface Config<T> {
    props: TextProps<T>;
    parser: Parser<T>;
    value: Value<T>;
    viewProps: ViewProps;
}
export declare class TextController<T> implements ValueController<T, TextView<T>> {
    readonly props: TextProps<T>;
    readonly value: Value<T>;
    readonly view: TextView<T>;
    readonly viewProps: ViewProps;
    private readonly parser_;
    constructor(doc: Document, config: Config<T>);
    private onInputChange_;
}
