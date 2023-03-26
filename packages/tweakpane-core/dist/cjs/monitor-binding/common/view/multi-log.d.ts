import { Formatter } from '../../../common/converter/formatter';
import { BufferedValue } from '../../../common/model/buffered-value';
import { ViewProps } from '../../../common/model/view-props';
import { View } from '../../../common/view/view';
interface Config<T> {
    formatter: Formatter<T>;
    lineCount: number;
    value: BufferedValue<T>;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class MultiLogView<T> implements View {
    readonly element: HTMLElement;
    readonly value: BufferedValue<T>;
    private readonly formatter_;
    private readonly textareaElem_;
    constructor(doc: Document, config: Config<T>);
    private update_;
    private onValueUpdate_;
}
export {};
