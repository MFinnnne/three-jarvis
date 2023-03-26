import { Value } from '../../../common/model/value';
import { ViewProps } from '../../../common/model/view-props';
import { View } from '../../../common/view/view';
import { Color } from '../model/color';
interface Config {
    value: Value<Color>;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class SvPaletteView implements View {
    readonly element: HTMLElement;
    readonly value: Value<Color>;
    readonly canvasElement: HTMLCanvasElement;
    private readonly markerElem_;
    constructor(doc: Document, config: Config);
    private update_;
    private onValueChange_;
}
export {};