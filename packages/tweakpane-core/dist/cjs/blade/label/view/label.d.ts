import { ValueMap } from '../../../common/model/value-map';
import { ViewProps } from '../../../common/model/view-props';
import { View } from '../../../common/view/view';
export declare type LabelPropsObject = {
    label: string | undefined;
};
export declare type LabelProps = ValueMap<LabelPropsObject>;
interface Config {
    props: LabelProps;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class LabelView implements View {
    readonly element: HTMLElement;
    readonly labelElement: HTMLElement;
    readonly valueElement: HTMLElement;
    constructor(doc: Document, config: Config);
}
export {};
