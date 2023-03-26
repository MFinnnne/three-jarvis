import { View } from '../../../common/view/view';
import { NumberTextView } from './number-text';
import { SliderView } from './slider';
interface Config {
    sliderView: SliderView;
    textView: NumberTextView;
}
/**
 * @hidden
 */
export declare class SliderTextView implements View {
    readonly element: HTMLElement;
    private readonly sliderView_;
    private readonly textView_;
    constructor(doc: Document, config: Config);
}
export {};
