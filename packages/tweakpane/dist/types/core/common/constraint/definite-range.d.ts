import { ValueMap } from '../model/value-map';
import { Constraint } from './constraint';
interface Config {
    max: number;
    min: number;
}
/**
 * A number range constraint that cannot be undefined. Used for slider control.
 */
export declare class DefiniteRangeConstraint implements Constraint<number> {
    readonly values: ValueMap<{
        max: number;
        min: number;
    }>;
    constructor(config: Config);
    constrain(value: number): number;
}
export {};
