import { Constraint } from '../../common/constraint/constraint';
import { BaseInputParams, PickerLayout, PointDimensionParams } from '../../common/params';
import { InputBindingPlugin } from '../plugin';
import { Point2d, Point2dObject } from './model/point-2d';
interface Point2dYParams extends PointDimensionParams {
    inverted?: boolean;
}
export interface Point2dInputParams extends BaseInputParams {
    expanded?: boolean;
    picker?: PickerLayout;
    x?: PointDimensionParams;
    y?: Point2dYParams;
}
export declare function createDimensionConstraint(params: PointDimensionParams | undefined, initialValue: number): Constraint<number> | undefined;
/**
 * @hidden
 */
export declare function getSuitableMaxValue(initialValue: Point2d, constraint: Constraint<Point2d> | undefined): number;
/**
 * @hidden
 */
export declare const Point2dInputPlugin: InputBindingPlugin<Point2d, Point2dObject, Point2dInputParams>;
export {};
