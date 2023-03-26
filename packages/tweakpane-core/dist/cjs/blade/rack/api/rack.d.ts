import { Bindable } from '../../../common/binding/target';
import { BaseBladeParams } from '../../../common/params';
import { View } from '../../../common/view/view';
import { PluginPool } from '../../../plugin/pool';
import { ButtonApi } from '../../button/api/button';
import { BladeApi } from '../../common/api/blade';
import { BladeRackApi } from '../../common/api/blade-rack';
import { ButtonParams, FolderParams, InputParams, MonitorParams, SeparatorParams, TabParams } from '../../common/api/params';
import { TpChangeEvent, TpUpdateEvent } from '../../common/api/tp-event';
import { BladeController } from '../../common/controller/blade';
import { NestedOrderedSet } from '../../common/model/nested-ordered-set';
import { FolderApi } from '../../folder/api/folder';
import { InputBindingApi } from '../../input-binding/api/input-binding';
import { MonitorBindingApi } from '../../monitor-binding/api/monitor-binding';
import { SeparatorApi } from '../../separator/api/separator';
import { TabApi } from '../../tab/api/tab';
import { RackController } from '../controller/rack';
export interface BladeRackApiEvents {
    change: {
        event: TpChangeEvent<unknown>;
    };
    update: {
        event: TpUpdateEvent<unknown>;
    };
}
export declare function findSubBladeApiSet(api: BladeApi<BladeController<View>>): NestedOrderedSet<BladeApi<BladeController<View>>> | null;
export declare class RackApi extends BladeApi<RackController> implements BladeRackApi {
    private readonly emitter_;
    private readonly apiSet_;
    private readonly pool_;
    /**
     * @hidden
     */
    constructor(controller: RackController, pool: PluginPool);
    get children(): BladeApi<BladeController<View>>[];
    addInput<O extends Bindable, Key extends keyof O>(object: O, key: Key, opt_params?: InputParams): InputBindingApi<unknown, O[Key]>;
    addMonitor<O extends Bindable, Key extends keyof O>(object: O, key: Key, opt_params?: MonitorParams): MonitorBindingApi<O[Key]>;
    addFolder(params: FolderParams): FolderApi;
    addButton(params: ButtonParams): ButtonApi;
    addSeparator(opt_params?: SeparatorParams): SeparatorApi;
    addTab(params: TabParams): TabApi;
    add<A extends BladeApi<BladeController<View>>>(api: A, opt_index?: number): A;
    remove(api: BladeApi<BladeController<View>>): void;
    addBlade(params: BaseBladeParams): BladeApi<BladeController<View>>;
    on<EventName extends keyof BladeRackApiEvents>(eventName: EventName, handler: (ev: BladeRackApiEvents[EventName]['event']) => void): this;
    private setUpApi_;
    private onRackAdd_;
    private onRackRemove_;
    private onRackInputChange_;
    private onRackMonitorUpdate_;
}
