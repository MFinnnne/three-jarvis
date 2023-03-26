import { BaseInputParams, ListParamsOptions } from '../../common/params';
import { InputBindingPlugin } from '../plugin';
export interface StringInputParams extends BaseInputParams {
    options?: ListParamsOptions<string>;
}
/**
 * @hidden
 */
export declare const StringInputPlugin: InputBindingPlugin<string, string, StringInputParams>;
