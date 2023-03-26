import { BaseMonitorParams } from '../../common/params';
import { MonitorBindingPlugin } from '../plugin';
export interface BooleanMonitorParams extends BaseMonitorParams {
    lineCount?: number;
}
/**
 * @hidden
 */
export declare const BooleanMonitorPlugin: MonitorBindingPlugin<boolean, BooleanMonitorParams>;
