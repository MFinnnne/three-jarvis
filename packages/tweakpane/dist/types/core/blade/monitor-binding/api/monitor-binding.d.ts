import { BladeApi } from '../../common/api/blade';
import { TpUpdateEvent } from '../../common/api/tp-event';
import { MonitorBindingController } from '../controller/monitor-binding';
export interface MonitorBindingApiEvents<T> {
    update: {
        event: TpUpdateEvent<T>;
    };
}
/**
 * The API for the monitor binding between the parameter and the pane.
 */
export declare class MonitorBindingApi<T> extends BladeApi<MonitorBindingController<T>> {
    private readonly emitter_;
    /**
     * @hidden
     */
    constructor(controller: MonitorBindingController<T>);
    get label(): string | undefined;
    set label(label: string | undefined);
    on<EventName extends keyof MonitorBindingApiEvents<T>>(eventName: EventName, handler: (ev: MonitorBindingApiEvents<T>[EventName]['event']) => void): MonitorBindingApi<T>;
    refresh(): void;
    private onBindingUpdate_;
}
