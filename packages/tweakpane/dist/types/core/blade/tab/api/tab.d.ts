import { PluginPool } from '../../../plugin/pool';
import { RackLikeApi } from '../../common/api/rack-like-api';
import { TpChangeEvent, TpTabSelectEvent, TpUpdateEvent } from '../../common/api/tp-event';
import { TabController } from '../controller/tab';
import { TabPageApi } from './tab-page';
interface TabApiEvents {
    change: {
        event: TpChangeEvent<unknown>;
    };
    select: {
        event: TpTabSelectEvent;
    };
    update: {
        event: TpUpdateEvent<unknown>;
    };
}
export interface TabPageParams {
    title: string;
    index?: number;
}
export declare class TabApi extends RackLikeApi<TabController> {
    private readonly emitter_;
    private readonly pageApiMap_;
    /**
     * @hidden
     */
    constructor(controller: TabController, pool: PluginPool);
    get pages(): TabPageApi[];
    addPage(params: TabPageParams): TabPageApi;
    removePage(index: number): void;
    on<EventName extends keyof TabApiEvents>(eventName: EventName, handler: (ev: TabApiEvents[EventName]['event']) => void): TabApi;
    private setUpPageApi_;
    private onPageAdd_;
    private onPageRemove_;
    private onSelect_;
}
export {};
