import { Foldable } from '../../../blade/common/model/foldable';
import { PickerLayout } from '../../../common/params';
import { View } from '../../../common/view/view';
interface Config {
    foldable: Foldable;
    pickerLayout: PickerLayout;
}
/**
 * @hidden
 */
export declare class ColorView implements View {
    readonly element: HTMLElement;
    readonly swatchElement: HTMLElement;
    readonly textElement: HTMLElement;
    readonly pickerElement: HTMLElement | null;
    constructor(doc: Document, config: Config);
}
export {};
