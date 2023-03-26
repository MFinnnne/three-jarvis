import { BaseInputParams, ListParamsOptions } from '../../common/params';
import { InputBindingPlugin } from '../plugin';
export interface BooleanInputParams extends BaseInputParams {
    options?: ListParamsOptions<boolean>;
}
/**
 * @hidden
 */
export declare const BooleanInputPlugin: InputBindingPlugin<boolean, boolean, BooleanInputParams>;
