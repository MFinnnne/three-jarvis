export declare type Bindable = Record<string, any>;
/**
 * A binding target.
 */
export declare class BindingTarget {
    private readonly key_;
    private readonly obj_;
    private readonly presetKey_;
    constructor(obj: Bindable, key: string, opt_id?: string);
    static isBindable(obj: unknown): obj is Bindable;
    /**
     * The property name of the binding.
     */
    get key(): string;
    /**
     * The key used for presets.
     */
    get presetKey(): string;
    /**
     * Read a bound value.
     * @return A bound value
     */
    read(): unknown;
    /**
     * Write a value.
     * @param value The value to write to the target.
     */
    write(value: unknown): void;
    /**
     * Write a value to the target property.
     * @param name The property name.
     * @param value The value to write to the target.
     */
    writeProperty(name: string, value: unknown): void;
}