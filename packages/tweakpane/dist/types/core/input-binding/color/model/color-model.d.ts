import { Tuple3, Tuple4 } from '../../../misc/type-util';
export declare type ColorComponents3 = Tuple3<number>;
export declare type ColorComponents4 = Tuple4<number>;
export declare type ColorMode = 'hsl' | 'hsv' | 'rgb';
export declare type ColorType = 'float' | 'int';
/**
 * @hidden
 */
export declare function hsvToRgbInt(h: number, s: number, v: number): ColorComponents3;
/**
 * @hidden
 */
export declare function hslToHsvInt(h: number, s: number, l: number): ColorComponents3;
/**
 * @hidden
 */
export declare function hsvToHslInt(h: number, s: number, v: number): ColorComponents3;
/**
 * @hidden
 */
export declare function removeAlphaComponent(comps: ColorComponents4): ColorComponents3;
/**
 * @hidden
 */
export declare function appendAlphaComponent(comps: ColorComponents3, alpha: number): ColorComponents4;
/**
 * @hidden
 */
export declare function getColorMaxComponents(mode: ColorMode, type: ColorType): ColorComponents3;
/**
 * @hidden
 */
export declare function constrainColorComponents(components: ColorComponents3 | ColorComponents4, mode: ColorMode, type: ColorType): ColorComponents4;
/**
 * @hidden
 */
export declare function convertColor(components: ColorComponents3, from: {
    mode: ColorMode;
    type: ColorType;
}, to: {
    mode: ColorMode;
    type: ColorType;
}): ColorComponents3;
