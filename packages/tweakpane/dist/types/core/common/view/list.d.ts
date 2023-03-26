import { ListItem } from '../constraint/list';
import { Value } from '../model/value';
import { ValueMap } from '../model/value-map';
import { ViewProps } from '../model/view-props';
import { View } from './view';
export declare type ListProps<T> = ValueMap<{
    options: ListItem<T>[];
}>;
interface Config<T> {
    props: ListProps<T>;
    value: Value<T>;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class ListView<T> implements View {
    readonly selectElement: HTMLSelectElement;
    readonly element: HTMLElement;
    private readonly value_;
    private readonly props_;
    constructor(doc: Document, config: Config<T>);
    private update_;
    private onValueChange_;
}
export {};
