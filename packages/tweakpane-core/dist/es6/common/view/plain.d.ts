import { ViewProps } from '../model/view-props';
import { View } from './view';
interface Config {
    viewName: string;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class PlainView implements View {
    readonly element: HTMLElement;
    constructor(doc: Document, config: Config);
}
export {};
