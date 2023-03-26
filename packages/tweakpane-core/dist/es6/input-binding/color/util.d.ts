import { BaseInputParams, PickerLayout } from '../../common/params';
import { ColorType } from './model/color-model';
export interface ColorInputParams extends BaseInputParams {
    /**
     * @deprecated Use color.alpha instead.
     */
    alpha?: boolean;
    color?: {
        alpha?: boolean;
        type?: ColorType;
    };
    expanded?: boolean;
    picker?: PickerLayout;
}
export declare function parseColorInputParams(params: Record<string, unknown>): ColorInputParams | undefined;
/**
 * @hidden
 */
export declare function getBaseStepForColor(forAlpha: boolean): number;
/**
 * @hidden
 */
export declare function extractColorType(params: ColorInputParams): ColorType | undefined;
