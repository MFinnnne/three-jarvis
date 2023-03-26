import { Constraint } from '../../common/constraint/constraint';
import { Formatter } from '../../common/converter/formatter';
import { BaseInputParams, ListParamsOptions } from '../../common/params';
import { InputBindingPlugin } from '../plugin';
export interface NumberInputParams extends BaseInputParams {
    format?: Formatter<number>;
    max?: number;
    min?: number;
    options?: ListParamsOptions<number>;
    step?: number;
}
/**
 * Tries to create a step constraint.
 * @param params The input parameters object.
 * @return A constraint or null if not found.
 */
export declare function createStepConstraint(params: {
    step?: number;
}, initialValue?: number): Constraint<number> | null;
/**
 * Tries to create a range constraint.
 * @param params The input parameters object.
 * @return A constraint or null if not found.
 */
export declare function createRangeConstraint(params: {
    max?: number;
    min?: number;
}): Constraint<number> | null;
/**
 * Finds a range from number constraint.
 * @param c The number constraint.
 * @return A list that contains a minimum value and a max value.
 */
export declare function findNumberRange(c: Constraint<number>): [number | undefined, number | undefined];
/**
 * @hidden
 */
export declare const NumberInputPlugin: InputBindingPlugin<number, number, NumberInputParams>;
