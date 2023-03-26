import { ValueMap } from '../../../common/model/value-map';
import { ViewProps } from '../../../common/model/view-props';
import { View } from '../../../common/view/view';
export declare type TabItemPropsObject = {
    selected: boolean;
    title: string | undefined;
};
export declare type TabItemProps = ValueMap<TabItemPropsObject>;
interface Config {
    props: TabItemProps;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class TabItemView implements View {
    readonly element: HTMLElement;
    readonly buttonElement: HTMLButtonElement;
    readonly titleElement: HTMLElement;
    constructor(doc: Document, config: Config);
}
export {};
