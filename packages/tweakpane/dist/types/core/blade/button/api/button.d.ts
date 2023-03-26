import { BladeApi } from '../../common/api/blade';
import { TpEvent } from '../../common/api/tp-event';
import { LabelController } from '../../label/controller/label';
import { ButtonController } from '../controller/button';
export interface ButtonApiEvents {
    click: {
        event: TpEvent;
    };
}
export declare class ButtonApi extends BladeApi<LabelController<ButtonController>> {
    get label(): string | undefined;
    set label(label: string | undefined);
    get title(): string;
    set title(title: string);
    on<EventName extends keyof ButtonApiEvents>(eventName: EventName, handler: (ev: ButtonApiEvents[EventName]['event']) => void): ButtonApi;
}
