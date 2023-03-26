import { ValueController } from '../../controller/value';
import { Parser } from '../../converter/parser';
import { Value } from '../../model/value';
import { ViewProps } from '../../model/view-props';
import { NumberTextProps } from '../view/number-text';
import { SliderProps } from '../view/slider';
import { SliderTextView } from '../view/slider-text';
import { NumberTextController } from './number-text';
import { SliderController } from './slider';
interface Config {
    baseStep: number;
    parser: Parser<number>;
    sliderProps: SliderProps;
    textProps: NumberTextProps;
    value: Value<number>;
    viewProps: ViewProps;
}
export declare class SliderTextController implements ValueController<number, SliderTextView> {
    readonly value: Value<number>;
    readonly view: SliderTextView;
    readonly viewProps: ViewProps;
    private readonly sliderC_;
    private readonly textC_;
    constructor(doc: Document, config: Config);
    get sliderController(): SliderController;
    get textController(): NumberTextController;
}
export {};
