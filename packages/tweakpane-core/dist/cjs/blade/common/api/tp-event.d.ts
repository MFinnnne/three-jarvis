/**
 * A base class of Tweakpane API events.
 */
export declare class TpEvent {
    /**
     * The event dispatcher.
     */
    readonly target: unknown;
    /**
     * @hidden
     */
    constructor(target: unknown);
}
/**
 * An event class for value changes of input bindings.
 * @template T The type of the value.
 */
export declare class TpChangeEvent<T> extends TpEvent {
    /**
     * The preset key of the event target.
     */
    readonly presetKey?: string;
    /**
     * The value.
     */
    readonly value: T;
    /**
     * The flag indicating whether the event is for the last change.
     */
    readonly last: boolean;
    /**
     * The flag indicating whether the event is for the first change.
     */
    readonly before: boolean;
    /**
     * @hidden
     */
    constructor(target: unknown, value: T, presetKey?: string, last?: boolean, before?: boolean);
}
/**
 * An event class for value updates of monitor bindings.
 * @template T The type of the value.
 */
export declare class TpUpdateEvent<T> extends TpEvent {
    /**
     * The preset key of the event target.
     */
    readonly presetKey: string;
    /**
     * The value.
     */
    readonly value: T;
    /**
     * @hidden
     */
    constructor(target: unknown, value: T, presetKey: string);
}
/**
 * An event class for folder.
 */
export declare class TpFoldEvent extends TpEvent {
    /**
     * The current state of the folder expansion.
     */
    readonly expanded: boolean;
    /**
     * @hidden
     */
    constructor(target: unknown, expanded: boolean);
}
/**
 * An event class for tab selection.
 */
export declare class TpTabSelectEvent extends TpEvent {
    /**
     * The selected index of the tab item.
     */
    readonly index: number;
    /**
     * @hidden
     */
    constructor(target: unknown, index: number);
}
