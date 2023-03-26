export interface BaseParams {
    disabled?: boolean;
    hidden?: boolean;
    index?: number;
}
export declare type ArrayStyleListOptions<T> = {
    text: string;
    value: T;
}[];
export declare type ObjectStyleListOptions<T> = {
    [text: string]: T;
};
export declare type ListParamsOptions<T> = ArrayStyleListOptions<T> | ObjectStyleListOptions<T>;
export interface PointDimensionParams {
    max?: number;
    min?: number;
    step?: number;
}
export declare type PickerLayout = 'inline' | 'popup';
export interface BaseInputParams extends BaseParams, Record<string, unknown> {
    label?: string;
    presetKey?: string;
    view?: string;
}
export interface BaseMonitorParams extends BaseParams, Record<string, unknown> {
    bufferSize?: number;
    interval?: number;
    label?: string;
    view?: string;
}
export interface BaseBladeParams extends BaseParams, Record<string, unknown> {
}
