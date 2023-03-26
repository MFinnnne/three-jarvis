import { Controller } from '../../../common/controller/controller';
import { Value } from '../../../common/model/value';
import { ViewProps } from '../../../common/model/view-props';
import { Color } from '../model/color';
import { ColorSwatchView } from '../view/color-swatch';
interface Config {
    value: Value<Color>;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class ColorSwatchController implements Controller<ColorSwatchView> {
    readonly value: Value<Color>;
    readonly view: ColorSwatchView;
    readonly viewProps: ViewProps;
    constructor(doc: Document, config: Config);
}
export {};
