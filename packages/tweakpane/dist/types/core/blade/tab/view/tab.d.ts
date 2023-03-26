import { Value } from '../../../common/model/value';
import { ViewProps } from '../../../common/model/view-props';
import { View } from '../../../common/view/view';
interface Config {
    contentsElement: HTMLElement;
    empty: Value<boolean>;
    viewProps: ViewProps;
}
export declare class TabView implements View {
    readonly element: HTMLElement;
    readonly itemsElement: HTMLElement;
    readonly contentsElement: HTMLElement;
    constructor(doc: Document, config: Config);
}
export {};
