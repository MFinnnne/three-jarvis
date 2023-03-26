import { BaseBladeParams } from '../../common/params';
import { BladePlugin } from '../plugin';
export interface ButtonBladeParams extends BaseBladeParams {
    title: string;
    view: 'button';
    label?: string;
}
export declare const ButtonBladePlugin: BladePlugin<ButtonBladeParams>;
