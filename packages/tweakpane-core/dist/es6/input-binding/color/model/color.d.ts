import { ColorComponents3, ColorComponents4, ColorMode, ColorType } from './color-model';
export interface RgbColorObject {
    r: number;
    g: number;
    b: number;
}
export interface RgbaColorObject {
    r: number;
    g: number;
    b: number;
    a: number;
}
/**
 * @hidden
 */
export declare class Color {
    static black(type?: ColorType): Color;
    static fromObject(obj: RgbColorObject | RgbaColorObject, type?: ColorType): Color;
    static toRgbaObject(color: Color, type?: ColorType): RgbaColorObject;
    static isRgbColorObject(obj: unknown): obj is RgbColorObject;
    static isRgbaColorObject(obj: unknown): obj is RgbaColorObject;
    static isColorObject(obj: unknown): obj is RgbColorObject | RgbaColorObject;
    static equals(v1: Color, v2: Color): boolean;
    private readonly comps_;
    readonly mode: ColorMode;
    readonly type: ColorType;
    constructor(comps: ColorComponents3 | ColorComponents4, mode: ColorMode, type?: ColorType);
    getComponents(opt_mode?: ColorMode, type?: ColorType): ColorComponents4;
    toRgbaObject(type?: ColorType): RgbaColorObject;
}
