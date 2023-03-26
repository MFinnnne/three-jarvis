import { Constraint } from './constraint';
/**
 * A number step range constraint.
 */
export declare class StepConstraint implements Constraint<number> {
    readonly step: number;
    readonly origin: number;
    constructor(step: number, origin?: number);
    constrain(value: number): number;
}
