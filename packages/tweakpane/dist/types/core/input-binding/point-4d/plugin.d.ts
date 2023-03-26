import { BaseInputParams, PointDimensionParams } from '../../common/params';
import { InputBindingPlugin } from '../plugin';
import { Point4d, Point4dObject } from './model/point-4d';
export interface Point4dInputParams extends BaseInputParams {
    x?: PointDimensionParams;
    y?: PointDimensionParams;
    z?: PointDimensionParams;
    w?: PointDimensionParams;
}
/**
 * @hidden
 */
export declare const Point4dInputPlugin: InputBindingPlugin<Point4d, Point4dObject, Point4dInputParams>;
