import { Constraint } from '../constraint/constraint';
import { Value } from './value';
interface Config<T> {
    constraint?: Constraint<T>;
    equals?: (v1: T, v2: T) => boolean;
}
export declare function createValue<T>(initialValue: T, config?: Config<T>): Value<T>;
export {};
