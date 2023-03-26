import { Controller } from '../../../common/controller/controller';
import { Formatter } from '../../../common/converter/formatter';
import { BufferedValue } from '../../../common/model/buffered-value';
import { ViewProps } from '../../../common/model/view-props';
import { SingleLogView } from '../view/single-log';
interface Config<T> {
    formatter: Formatter<T>;
    value: BufferedValue<T>;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class SingleLogController<T> implements Controller<SingleLogView<T>> {
    readonly value: BufferedValue<T>;
    readonly view: SingleLogView<T>;
    readonly viewProps: ViewProps;
    constructor(doc: Document, config: Config<T>);
}
export {};
