import { BladePlugin } from '../../blade/plugin';
import { BaseBladeParams } from '../../common/params';
export interface SeparatorBladeParams extends BaseBladeParams {
    view: 'separator';
}
export declare const SeparatorBladePlugin: BladePlugin<SeparatorBladeParams>;
