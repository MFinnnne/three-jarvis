import { BladePlugin } from '../blade/plugin';
import { InputBindingPlugin } from '../input-binding/plugin';
import { MonitorBindingPlugin } from '../monitor-binding/plugin';
import { PluginPool } from './pool';
export type TpPlugin = BladePlugin<any> | InputBindingPlugin<any, any, any> | MonitorBindingPlugin<any, any>;
export type TpPluginBundle = {
    plugin: TpPlugin;
} | {
    plugins: TpPlugin[];
};
export declare function createDefaultPluginPool(): PluginPool;
