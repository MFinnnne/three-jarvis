import { Controller } from '../../../common/controller/controller';
import { Parser } from '../../../common/converter/parser';
import { Value } from '../../../common/model/value';
import { ViewProps } from '../../../common/model/view-props';
import { Color } from '../model/color';
import { ColorMode, ColorType } from '../model/color-model';
import { ColorTextView } from '../view/color-text';
interface Config {
    colorType: ColorType;
    parser: Parser<number>;
    value: Value<Color>;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class ColorTextController implements Controller<ColorTextView> {
    readonly colorMode: Value<ColorMode>;
    readonly value: Value<Color>;
    readonly view: ColorTextView;
    readonly viewProps: ViewProps;
    private readonly parser_;
    private readonly colorType_;
    private ccs_;
    constructor(doc: Document, config: Config);
    private createComponentControllers_;
    private onModeSelectChange_;
}
export {};
