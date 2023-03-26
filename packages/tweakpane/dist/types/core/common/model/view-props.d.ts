import { ReadonlyValue } from './readonly-value';
import { Value } from './value';
import { ValueMap, ValueMapEvents } from './value-map';
export type ViewPropsObject = {
    disabled: boolean;
    disposed: boolean;
    hidden: boolean;
    parent: ViewProps | null;
};
export type ViewPropsEvents = ValueMapEvents<ViewPropsObject>;
interface Disableable {
    disabled: boolean;
}
export declare class ViewProps extends ValueMap<ViewPropsObject> {
    private readonly globalDisabled_;
    private readonly setGlobalDisabled_;
    constructor(valueMap: {
        [Key in keyof ViewPropsObject]: Value<ViewPropsObject[Key]>;
    });
    static create(opt_initialValue?: Partial<ViewPropsObject>): ViewProps;
    get globalDisabled(): ReadonlyValue<boolean>;
    bindClassModifiers(elem: HTMLElement): void;
    bindDisabled(target: Disableable): void;
    bindTabIndex(elem: HTMLOrSVGElement): void;
    handleDispose(callback: () => void): void;
    /**
     * Gets a global disabled of the view.
     * Disabled of the view will be affected by its disabled and its parent disabled.
     */
    private getGlobalDisabled_;
    private updateGlobalDisabled_;
    private onDisabledChange_;
    private onParentGlobalDisabledChange_;
    private onParentChange_;
}
export {};
