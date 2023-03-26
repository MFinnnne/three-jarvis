import { Formatter } from '../../../common/converter/formatter';
import { BufferedValue } from '../../../common/model/buffered-value';
import { Value } from '../../../common/model/value';
import { ValueMap } from '../../../common/model/value-map';
import { ViewProps } from '../../../common/model/view-props';
import { View } from '../../../common/view/view';
export declare type GraphLogProps = ValueMap<{
    maxValue: number;
    minValue: number;
}>;
interface Config {
    cursor: Value<number>;
    formatter: Formatter<number>;
    lineCount: number;
    props: GraphLogProps;
    value: BufferedValue<number>;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class GraphLogView implements View {
    readonly element: HTMLElement;
    readonly value: BufferedValue<number>;
    private readonly props_;
    private readonly cursor_;
    private readonly formatter_;
    private readonly lineElem_;
    private readonly svgElem_;
    private readonly tooltipElem_;
    constructor(doc: Document, config: Config);
    get graphElement(): Element;
    private update_;
    private onValueUpdate_;
    private onCursorChange_;
}
export {};
