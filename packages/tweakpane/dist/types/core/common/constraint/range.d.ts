import { ValueMap } from '../model/value-map';
import { Constraint } from './constraint';
interface Config {
    max?: number;
    min?: number;
}
/**
 * A number range constraint.
 */
export declare class RangeConstraint implements Constraint<number> {
    readonly values: ValueMap<{
        max: number | undefined;
        min: number | undefined;
    }>;
    constructor(config: Config);
    /**
     * @deprecated Use values.get('max') instead.
     */
    get maxValue(): number | undefined;
    /**
     * @deprecated Use values.get('min') instead.
     */
    get minValue(): number | undefined;
    constrain(value: number): number;
}
export {};
