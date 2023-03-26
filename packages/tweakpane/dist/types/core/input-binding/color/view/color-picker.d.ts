import { NumberTextView } from '../../../common/number/view/number-text';
import { View } from '../../../common/view/view';
import { ViewProps } from '../../../index';
import { APaletteView } from './a-palette';
import { ColorTextView } from './color-text';
import { HPaletteView } from './h-palette';
import { SvPaletteView } from './sv-palette';
interface Config {
    alphaViews: {
        palette: APaletteView;
        text: NumberTextView;
    } | null;
    hPaletteView: HPaletteView;
    supportsAlpha: boolean;
    svPaletteView: SvPaletteView;
    textView: ColorTextView;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class ColorPickerView implements View {
    readonly element: HTMLElement;
    private readonly alphaViews_;
    private readonly hPaletteView_;
    private readonly svPaletteView_;
    private readonly textView_;
    constructor(doc: Document, config: Config);
    get allFocusableElements(): HTMLElement[];
}
export {};
