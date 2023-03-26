import { BaseBladeParams } from '../../common/params';
import { BladePlugin } from '../plugin';
export interface FolderBladeParams extends BaseBladeParams {
    title: string;
    view: 'folder';
    expanded?: boolean;
}
export declare const FolderBladePlugin: BladePlugin<FolderBladeParams>;
