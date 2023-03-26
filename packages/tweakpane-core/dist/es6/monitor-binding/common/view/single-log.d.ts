import { Formatter } from '../../../common/converter/formatter';
import { BufferedValue } from '../../../common/model/buffered-value';
import { ViewProps } from '../../../common/model/view-props';
import { View } from '../../../common/view/view';
interface Config<T> {
    formatter: Formatter<T>;
    value: BufferedValue<T>;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class SingleLogView<T> implements View {
    readonly element: HTMLElement;
    readonly inputElement: HTMLInputElement;
    readonly value: BufferedValue<T>;
    private readonly formatter_;
    constructor(doc: Document, config: Config<T>);
    private update_;
    private onValueUpdate_;
}
export {};
