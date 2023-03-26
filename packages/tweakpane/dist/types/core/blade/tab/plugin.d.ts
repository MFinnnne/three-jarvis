import { BaseBladeParams } from '../../common/params';
import { BladePlugin } from '../plugin';
export interface TabBladeParams extends BaseBladeParams {
    pages: {
        title: string;
    }[];
    view: 'tab';
}
export declare const TabBladePlugin: BladePlugin<TabBladeParams>;
