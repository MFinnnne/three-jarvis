import { BaseInputParams, PointDimensionParams } from '../../common/params';
import { InputBindingPlugin } from '../plugin';
import { Point3d, Point3dObject } from './model/point-3d';
export interface Point3dInputParams extends BaseInputParams {
    x?: PointDimensionParams;
    y?: PointDimensionParams;
    z?: PointDimensionParams;
}
/**
 * @hidden
 */
export declare const Point3dInputPlugin: InputBindingPlugin<Point3d, Point3dObject, Point3dInputParams>;
