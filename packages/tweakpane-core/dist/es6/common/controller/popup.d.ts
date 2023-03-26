import { Value } from '../model/value';
import { ViewProps } from '../model/view-props';
import { PopupView } from '../view/popup';
import { Controller } from './controller';
interface Config {
    viewProps: ViewProps;
}
export declare class PopupController implements Controller<PopupView> {
    readonly shows: Value<boolean>;
    readonly view: PopupView;
    readonly viewProps: ViewProps;
    constructor(doc: Document, config: Config);
}
export {};
