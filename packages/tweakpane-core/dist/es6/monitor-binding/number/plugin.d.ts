import { Formatter } from '../../common/converter/formatter';
import { BaseMonitorParams } from '../../common/params';
import { MonitorBindingPlugin } from '../plugin';
export interface NumberMonitorParams extends BaseMonitorParams {
    format?: Formatter<number>;
    lineCount?: number;
    max?: number;
    min?: number;
}
/**
 * @hidden
 */
export declare const NumberMonitorPlugin: MonitorBindingPlugin<number, NumberMonitorParams>;
