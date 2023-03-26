import { Controller } from '../../../common/controller/controller';
import { Value } from '../../../common/model/value';
import { ViewProps } from '../../../common/model/view-props';
import { Color } from '../model/color';
import { ColorType } from '../model/color-model';
import { ColorPickerView } from '../view/color-picker';
import { ColorTextController } from './color-text';
interface Config {
    colorType: ColorType;
    supportsAlpha: boolean;
    value: Value<Color>;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class ColorPickerController implements Controller<ColorPickerView> {
    readonly value: Value<Color>;
    readonly view: ColorPickerView;
    readonly viewProps: ViewProps;
    private readonly alphaIcs_;
    private readonly hPaletteC_;
    private readonly svPaletteC_;
    private readonly textC_;
    constructor(doc: Document, config: Config);
    get textController(): ColorTextController;
}
export {};
