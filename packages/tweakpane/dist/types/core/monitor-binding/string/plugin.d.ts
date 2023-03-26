import { BaseMonitorParams } from '../../common/params';
import { MonitorBindingPlugin } from '../plugin';
export interface StringMonitorParams extends BaseMonitorParams {
    lineCount?: number;
    multiline?: boolean;
}
/**
 * @hidden
 */
export declare const StringMonitorPlugin: MonitorBindingPlugin<string, StringMonitorParams>;
