import { Constraint } from './constraint/constraint';
import { ListConstraint, ListItem } from './constraint/list';
import { ArrayStyleListOptions, ListParamsOptions, ObjectStyleListOptions, PickerLayout, PointDimensionParams } from './params';
export declare function parseListOptions<T>(value: unknown): ListParamsOptions<T> | undefined;
export declare function parsePickerLayout(value: unknown): PickerLayout | undefined;
export declare function parsePointDimensionParams(value: unknown): PointDimensionParams | undefined;
export declare function normalizeListOptions<T>(options: ArrayStyleListOptions<T> | ObjectStyleListOptions<T>): ListItem<T>[];
/**
 * Tries to create a list constraint.
 * @template T The type of the raw value.
 * @param options The list options.
 * @return A constraint or null if not found.
 */
export declare function createListConstraint<T>(options: ListParamsOptions<T> | undefined): ListConstraint<T> | null;
/**
 * @hidden
 */
export declare function getSuitableDecimalDigits(constraint: Constraint<number> | undefined, rawValue: number): number;
/**
 * @hidden
 */
export declare function getBaseStep(constraint: Constraint<number> | undefined): number;
/**
 * @hidden
 */
export declare function getSuitableDraggingScale(constraint: Constraint<number> | undefined, rawValue: number): number;
