import { BladeApi } from '../../common/api/blade';
import { TpChangeEvent } from '../../common/api/tp-event';
import { InputBindingController } from '../controller/input-binding';
export interface InputBindingApiEvents<Ex> {
    change: {
        event: TpChangeEvent<Ex>;
    };
}
/**
 * The API for the input binding between the parameter and the pane.
 * @template In The internal type.
 * @template Ex The external type (= parameter object).
 */
export declare class InputBindingApi<In, Ex> extends BladeApi<InputBindingController<In>> {
    private readonly emitter_;
    /**
     * @hidden
     */
    constructor(controller: InputBindingController<In>);
    get label(): string | undefined;
    set label(label: string | undefined);
    on<EventName extends keyof InputBindingApiEvents<Ex>>(eventName: EventName, handler: (ev: InputBindingApiEvents<Ex>[EventName]['event']) => void): InputBindingApi<In, Ex>;
    /**
     *  set value directly
     *
     * @param rawValue raw value
     * @param emit true: emit 'change' event,false: not emit 'change' event
     */
    setValue(rawValue: In, emit?: boolean): void;
    refresh(): void;
    private onBindingChange_;
}
