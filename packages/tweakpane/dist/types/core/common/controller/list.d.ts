import { Value } from '../model/value';
import { ViewProps } from '../model/view-props';
import { ListProps, ListView } from '../view/list';
import { ValueController } from './value';
interface Config<T> {
    props: ListProps<T>;
    value: Value<T>;
    viewProps: ViewProps;
}
export declare class ListController<T> implements ValueController<T, ListView<T>> {
    readonly value: Value<T>;
    readonly view: ListView<T>;
    readonly props: ListProps<T>;
    readonly viewProps: ViewProps;
    constructor(doc: Document, config: Config<T>);
    private onSelectChange_;
}
export {};
