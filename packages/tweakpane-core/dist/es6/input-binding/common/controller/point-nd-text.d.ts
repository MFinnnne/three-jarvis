import { Constraint } from '../../../common/constraint/constraint';
import { Controller } from '../../../common/controller/controller';
import { Parser } from '../../../common/converter/parser';
import { Value } from '../../../common/model/value';
import { ViewProps } from '../../../common/model/view-props';
import { NumberTextProps } from '../../../common/number/view/number-text';
import { PointNdAssembly } from '../model/point-nd';
import { PointNdTextView } from '../view/point-nd-text';
interface Axis {
    baseStep: number;
    constraint: Constraint<number> | undefined;
    textProps: NumberTextProps;
}
interface Config<PointNd> {
    assembly: PointNdAssembly<PointNd>;
    axes: Axis[];
    parser: Parser<number>;
    value: Value<PointNd>;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class PointNdTextController<PointNd> implements Controller<PointNdTextView> {
    readonly value: Value<PointNd>;
    readonly view: PointNdTextView;
    readonly viewProps: ViewProps;
    private readonly acs_;
    constructor(doc: Document, config: Config<PointNd>);
}
export {};
