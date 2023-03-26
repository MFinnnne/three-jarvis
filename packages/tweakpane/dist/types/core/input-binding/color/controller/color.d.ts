import { Controller } from '../../../common/controller/controller';
import { TextController } from '../../../common/controller/text';
import { Formatter } from '../../../common/converter/formatter';
import { Parser } from '../../../common/converter/parser';
import { Value } from '../../../common/model/value';
import { ViewProps } from '../../../common/model/view-props';
import { PickerLayout } from '../../../common/params';
import { Color } from '../model/color';
import { ColorType } from '../model/color-model';
import { ColorView } from '../view/color';
interface Config {
    colorType: ColorType;
    expanded: boolean;
    formatter: Formatter<Color>;
    parser: Parser<Color>;
    pickerLayout: PickerLayout;
    supportsAlpha: boolean;
    value: Value<Color>;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class ColorController implements Controller<ColorView> {
    readonly value: Value<Color>;
    readonly view: ColorView;
    readonly viewProps: ViewProps;
    private readonly swatchC_;
    private readonly textC_;
    private readonly pickerC_;
    private readonly popC_;
    private readonly foldable_;
    constructor(doc: Document, config: Config);
    get textController(): TextController<Color>;
    private onButtonBlur_;
    private onButtonClick_;
    private onPopupChildBlur_;
    private onPopupChildKeydown_;
}
export {};
