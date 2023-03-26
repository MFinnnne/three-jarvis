import { Controller } from '../../../common/controller/controller';
import { Value } from '../../../common/model/value';
import { ViewProps } from '../../../common/model/view-props';
import { PickerLayout } from '../../../common/params';
import { Point2d } from '../model/point-2d';
import { Point2dPickerView } from '../view/point-2d-picker';
interface Config {
    baseSteps: [number, number];
    invertsY: boolean;
    layout: PickerLayout;
    maxValue: number;
    value: Value<Point2d>;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class Point2dPickerController implements Controller<Point2dPickerView> {
    readonly value: Value<Point2d>;
    readonly view: Point2dPickerView;
    readonly viewProps: ViewProps;
    private readonly baseSteps_;
    private readonly ptHandler_;
    private readonly invertsY_;
    private readonly maxValue_;
    constructor(doc: Document, config: Config);
    private handlePointerEvent_;
    private onPointerDown_;
    private onPointerMove_;
    private onPointerUp_;
    private onPadKeyDown_;
    private onPadKeyUp_;
}
export {};
