import { Value } from '../../../common/model/value';
import { ViewProps } from '../../../common/model/view-props';
import { PickerLayout } from '../../../common/params';
import { View } from '../../../common/view/view';
import { Point2d } from '../model/point-2d';
interface Config {
    invertsY: boolean;
    layout: PickerLayout;
    maxValue: number;
    value: Value<Point2d>;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class Point2dPickerView implements View {
    readonly element: HTMLElement;
    readonly padElement: HTMLDivElement;
    readonly value: Value<Point2d>;
    private readonly invertsY_;
    private readonly maxValue_;
    private readonly svgElem_;
    private readonly lineElem_;
    private readonly markerElem_;
    constructor(doc: Document, config: Config);
    get allFocusableElements(): HTMLElement[];
    private update_;
    private onValueChange_;
    private onFoldableChange_;
}
export {};
