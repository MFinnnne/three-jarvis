import { Value } from '../../../common/model/value';
import { ValueMap } from '../../../common/model/value-map';
declare type FoldableObject = {
    completed: boolean;
    expanded: boolean;
    expandedHeight: number | null;
    shouldFixHeight: boolean;
    temporaryExpanded: boolean | null;
};
/**
 * @hidden
 */
export declare class Foldable extends ValueMap<FoldableObject> {
    constructor(valueMap: {
        [Key in keyof FoldableObject]: Value<FoldableObject[Key]>;
    });
    static create(expanded: boolean): Foldable;
    get styleExpanded(): boolean;
    get styleHeight(): string;
    bindExpandedClass(elem: HTMLElement, expandedClassName: string): void;
    cleanUpTransition(): void;
}
/**
 * @deprecated Use Foldable.create instead.
 */
export declare function createFoldable(expanded: boolean): Foldable;
/**
 * @deprecated Use foldable.styleExpanded instead.
 */
export declare function getFoldableStyleExpanded(foldable: Foldable): boolean;
/**
 * @deprecated Use foldable.styleHeight instead.
 */
export declare function getFoldableStyleHeight(foldable: Foldable): string;
export declare function bindFoldable(foldable: Foldable, elem: HTMLElement): void;
export {};
