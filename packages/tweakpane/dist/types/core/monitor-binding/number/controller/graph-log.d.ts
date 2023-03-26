import { Controller } from '../../../common/controller/controller';
import { Formatter } from '../../../common/converter/formatter';
import { BufferedValue } from '../../../common/model/buffered-value';
import { ViewProps } from '../../../common/model/view-props';
import { GraphLogProps, GraphLogView } from '../view/graph-log';
interface Config {
    formatter: Formatter<number>;
    lineCount: number;
    props: GraphLogProps;
    value: BufferedValue<number>;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class GraphLogController implements Controller<GraphLogView> {
    readonly value: BufferedValue<number>;
    readonly view: GraphLogView;
    readonly viewProps: ViewProps;
    private readonly cursor_;
    private readonly props_;
    constructor(doc: Document, config: Config);
    private onGraphMouseLeave_;
    private onGraphMouseMove_;
    private onGraphPointerDown_;
    private onGraphPointerMove_;
    private onGraphPointerUp_;
}
export {};
