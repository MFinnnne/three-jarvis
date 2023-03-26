import { BladeApi } from '../blade/common/api/blade';
import { InputParams, MonitorParams } from '../blade/common/api/params';
import { BladeController } from '../blade/common/controller/blade';
import { InputBindingController } from '../blade/input-binding/controller/input-binding';
import { MonitorBindingController } from '../blade/monitor-binding/controller/monitor-binding';
import { BindingTarget } from '../common/binding/target';
import { View } from '../common/view/view';
import { TpPlugin } from './plugins';
/**
 * @hidden
 */
export declare class PluginPool {
    private readonly pluginsMap_;
    getAll(): TpPlugin[];
    register(r: TpPlugin): void;
    createInput(document: Document, target: BindingTarget, params: InputParams): InputBindingController<unknown>;
    createMonitor(document: Document, target: BindingTarget, params: MonitorParams): MonitorBindingController<unknown>;
    createBlade(document: Document, params: Record<string, unknown>): BladeController<View>;
    createBladeApi(bc: BladeController<View>): BladeApi<BladeController<View>>;
}
