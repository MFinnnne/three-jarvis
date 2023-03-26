import { Value } from '../../../common/model/value';
import { ViewProps } from '../../../common/model/view-props';
import { NumberTextView } from '../../../common/number/view/number-text';
import { View } from '../../../common/view/view';
import { ColorMode } from '../model/color-model';
interface Config {
    colorMode: Value<ColorMode>;
    textViews: [NumberTextView, NumberTextView, NumberTextView];
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class ColorTextView implements View {
    readonly element: HTMLElement;
    private readonly modeElem_;
    private readonly textsElem_;
    private textViews_;
    constructor(doc: Document, config: Config);
    get modeSelectElement(): HTMLSelectElement;
    get textViews(): [NumberTextView, NumberTextView, NumberTextView];
    set textViews(textViews: [NumberTextView, NumberTextView, NumberTextView]);
    private applyTextViews_;
}
export {};
