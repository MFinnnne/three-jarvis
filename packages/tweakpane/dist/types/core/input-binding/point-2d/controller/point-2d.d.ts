import { Constraint } from '../../../common/constraint/constraint';
import { Controller } from '../../../common/controller/controller';
import { Parser } from '../../../common/converter/parser';
import { Value } from '../../../common/model/value';
import { ViewProps } from '../../../common/model/view-props';
import { NumberTextProps } from '../../../common/number/view/number-text';
import { PickerLayout } from '../../../common/params';
import { Point2d } from '../model/point-2d';
import { Point2dView } from '../view/point-2d';
interface Axis {
    baseStep: number;
    constraint: Constraint<number> | undefined;
    textProps: NumberTextProps;
}
interface Config {
    axes: [Axis, Axis];
    expanded: boolean;
    invertsY: boolean;
    maxValue: number;
    parser: Parser<number>;
    pickerLayout: PickerLayout;
    value: Value<Point2d>;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class Point2dController implements Controller<Point2dView> {
    readonly value: Value<Point2d>;
    readonly view: Point2dView;
    readonly viewProps: ViewProps;
    private readonly popC_;
    private readonly pickerC_;
    private readonly textC_;
    private readonly foldable_;
    constructor(doc: Document, config: Config);
    private onPadButtonBlur_;
    private onPadButtonClick_;
    private onPopupChildBlur_;
    private onPopupChildKeydown_;
}
export {};
