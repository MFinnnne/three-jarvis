import { Bindable } from '../../../common/binding/target';
import { BaseBladeParams } from '../../../common/params';
import { View } from '../../../common/view/view';
import { PluginPool } from '../../../plugin/pool';
import { ButtonApi } from '../../button/api/button';
import { BladeApi } from '../../common/api/blade';
import { BladeRackApi } from '../../common/api/blade-rack';
import { ButtonParams, FolderParams, InputParams, MonitorParams, SeparatorParams, TabParams } from '../../common/api/params';
import { RackLikeApi } from '../../common/api/rack-like-api';
import { TpChangeEvent, TpFoldEvent, TpUpdateEvent } from '../../common/api/tp-event';
import { BladeController } from '../../common/controller/blade';
import { InputBindingApi } from '../../input-binding/api/input-binding';
import { MonitorBindingApi } from '../../monitor-binding/api/monitor-binding';
import { SeparatorApi } from '../../separator/api/separator';
import { TabApi } from '../../tab/api/tab';
import { FolderController } from '../controller/folder';
export interface FolderApiEvents {
    change: {
        event: TpChangeEvent<unknown>;
    };
    fold: {
        event: TpFoldEvent;
    };
    update: {
        event: TpUpdateEvent<unknown>;
    };
}
export declare class FolderApi extends RackLikeApi<FolderController> implements BladeRackApi {
    private readonly emitter_;
    /**
     * @hidden
     */
    constructor(controller: FolderController, pool: PluginPool);
    get expanded(): boolean;
    set expanded(expanded: boolean);
    get title(): string | undefined;
    set title(title: string | undefined);
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
    /**
     * Adds a global event listener. It handles all events of child inputs/monitors.
     * @param eventName The event name to listen.
     * @return The API object itself.
     */
    on<EventName extends keyof FolderApiEvents>(eventName: EventName, handler: (ev: FolderApiEvents[EventName]['event']) => void): FolderApi;
}
