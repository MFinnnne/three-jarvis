import { Value } from '../../../common/model/value';
import { ViewProps } from '../../../common/model/view-props';
import { PickerLayout } from '../../../common/params';
import { View } from '../../../common/view/view';
interface Config {
    expanded: Value<boolean>;
    pickerLayout: PickerLayout;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class Point2dView implements View {
    readonly element: HTMLElement;
    readonly buttonElement: HTMLButtonElement;
    readonly textElement: HTMLElement;
    readonly pickerElement: HTMLElement | null;
    constructor(doc: Document, config: Config);
}
export {};
