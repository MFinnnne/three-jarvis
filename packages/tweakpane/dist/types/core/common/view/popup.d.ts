import { Value } from '../model/value';
import { ViewProps } from '../model/view-props';
import { View } from './view';
interface Config {
    shows: Value<boolean>;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class PopupView implements View {
    readonly element: HTMLElement;
    constructor(doc: Document, config: Config);
}
export {};
