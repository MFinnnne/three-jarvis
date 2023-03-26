import { BaseBladeParams, BladePlugin, ListParamsOptions } from '../../../../core/index';
export interface ListBladeParams<T> extends BaseBladeParams {
    options: ListParamsOptions<T>;
    value: T;
    view: 'list';
    label?: string;
}
export declare const ListBladePlugin: BladePlugin<ListBladeParams<unknown>>;
