import { BindingReader } from '../../../common/binding/binding';
import { Formatter } from '../../../common/converter/formatter';
import { Parser } from '../../../common/converter/parser';
import { Color } from '../model/color';
import { ColorMode, ColorType } from '../model/color-model';
/**
 * @deprecated
 */
export declare type StringColorNotation = 'hex.rgb' | 'hex.rgba' | 'func.hsl' | 'func.hsla' | 'func.rgb' | 'func.rgba';
declare type StringColorNotation2 = 'func' | 'hex' | 'object';
export interface StringColorFormat {
    alpha: boolean;
    mode: ColorMode;
    notation: StringColorNotation2;
    type: ColorType;
}
/**
 * @deprecated
 * @hidden
 */
export declare function getColorNotation(text: string): StringColorNotation | null;
export declare function detectStringColorFormat(text: string, type?: ColorType): StringColorFormat | null;
/**
 * @deprecated Use createColorStringParser instead.
 * @hidden
 */
export declare const CompositeColorParser: Parser<Color>;
export declare function createColorStringBindingReader(type: ColorType): BindingReader<Color>;
export declare function createColorStringParser(type: ColorType): Parser<Color>;
/**
 * @deprecated
 * @hidden
 */
export declare function hasAlphaComponent(notation: StringColorNotation): boolean;
/**
 * @deprecated
 * @hidden
 */
export declare function colorFromString(value: unknown): Color;
/**
 * @hidden
 */
export declare function colorToHexRgbString(value: Color, prefix?: string): string;
/**
 * @hidden
 */
export declare function colorToHexRgbaString(value: Color, prefix?: string): string;
/**
 * @hidden
 */
export declare function colorToFunctionalRgbString(value: Color, opt_type?: ColorType): string;
/**
 * @hidden
 */
export declare function colorToFunctionalRgbaString(value: Color, opt_type?: ColorType): string;
/**
 * @hidden
 */
export declare function colorToFunctionalHslString(value: Color): string;
/**
 * @hidden
 */
export declare function colorToFunctionalHslaString(value: Color): string;
/**
 * @hidden
 */
export declare function colorToObjectRgbString(value: Color, type: ColorType): string;
/**
 * @hidden
 */
export declare function colorToObjectRgbaString(value: Color, type: ColorType): string;
/**
 * @deprecated
 */
export declare function getColorStringifier(notation: StringColorNotation): (value: Color) => string;
export declare function findColorStringifier(format: StringColorFormat): Formatter<Color> | null;
export {};
