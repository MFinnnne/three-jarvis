import { Color } from '../model/color';
import { ColorType } from '../model/color-model';
/**
 * @hidden
 */
export declare function colorFromObject(value: unknown, opt_type?: ColorType): Color;
/**
 * @hidden
 */
export declare function colorToRgbNumber(value: Color): number;
/**
 * @hidden
 */
export declare function colorToRgbaNumber(value: Color): number;
/**
 * @hidden
 */
export declare function numberToRgbColor(num: number): Color;
/**
 * @hidden
 */
export declare function numberToRgbaColor(num: number): Color;
/**
 * @hidden
 */
export declare function colorFromRgbNumber(value: unknown): Color;
/**
 * @hidden
 */
export declare function colorFromRgbaNumber(value: unknown): Color;
