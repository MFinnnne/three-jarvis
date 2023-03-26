import { Value } from '../model/value';
import { ValueMap } from '../model/value-map';
import { ReadonlyValue } from './readonly-value';
export declare function bindValue<T>(value: Value<T> | ReadonlyValue<T>, applyValue: (value: T) => void): void;
export declare function bindValueMap<O extends Record<string, unknown>, Key extends keyof O>(valueMap: ValueMap<O>, key: Key, applyValue: (value: O[Key]) => void): void;
