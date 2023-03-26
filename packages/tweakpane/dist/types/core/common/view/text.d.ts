import { Formatter } from '../converter/formatter';
import { Value } from '../model/value';
import { ValueMap } from '../model/value-map';
import { ViewProps } from '../model/view-props';
import { View } from './view';
export declare type TextProps<T> = ValueMap<{
    formatter: Formatter<T>;
}>;
interface Config<T> {
    props: TextProps<T>;
    value: Value<T>;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class TextView<T> implements View {
    readonly inputElement: HTMLInputElement;
    readonly element: HTMLElement;
    private readonly props_;
    private readonly value_;
    constructor(doc: Document, config: Config<T>);
    refresh(): void;
    private onChange_;
}
export {};
