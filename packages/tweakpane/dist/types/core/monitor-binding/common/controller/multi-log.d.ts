import { Controller } from '../../../common/controller/controller';
import { Formatter } from '../../../common/converter/formatter';
import { BufferedValue } from '../../../common/model/buffered-value';
import { ViewProps } from '../../../common/model/view-props';
import { MultiLogView } from '../view/multi-log';
interface Config<T> {
    formatter: Formatter<T>;
    lineCount: number;
    value: BufferedValue<T>;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class MultiLogController<T> implements Controller<MultiLogView<T>> {
    readonly value: BufferedValue<T>;
    readonly view: MultiLogView<T>;
    readonly viewProps: ViewProps;
    constructor(doc: Document, config: Config<T>);
}
export {};
