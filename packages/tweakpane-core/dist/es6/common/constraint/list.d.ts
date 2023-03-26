import { ValueMap } from '../model/value-map';
import { Constraint } from './constraint';
export interface ListItem<T> {
    text: string;
    value: T;
}
/**
 * A list constranit.
 * @template T The type of the value.
 */
export declare class ListConstraint<T> implements Constraint<T> {
    readonly values: ValueMap<{
        options: ListItem<T>[];
    }>;
    constructor(options: ListItem<T>[]);
    /**
     * @deprecated Use values.get('options') instead.
     */
    get options(): ListItem<T>[];
    constrain(value: T): T;
}
