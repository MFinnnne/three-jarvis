import { Controller } from '../../controller/controller';
import { Parser } from '../../converter/parser';
import { Value } from '../../model/value';
import { ViewProps } from '../../model/view-props';
import { NumberTextProps, NumberTextView } from '../view/number-text';
import { SliderProps } from '../view/slider';
interface Config {
    baseStep: number;
    parser: Parser<number>;
    props: NumberTextProps;
    sliderProps?: SliderProps;
    value: Value<number>;
    viewProps: ViewProps;
    arrayPosition?: 'fst' | 'mid' | 'lst';
}
/**
 * @hidden
 */
export declare class NumberTextController implements Controller<NumberTextView> {
    readonly props: NumberTextProps;
    readonly value: Value<number>;
    readonly view: NumberTextView;
    readonly viewProps: ViewProps;
    private readonly sliderProps_;
    private readonly baseStep_;
    private readonly parser_;
    private readonly dragging_;
    private originRawValue_;
    constructor(doc: Document, config: Config);
    private constrainValue_;
    private onInputChange_;
    private onInputKeyDown_;
    private onInputKeyUp_;
    private onPointerDown_;
    private computeDraggingValue_;
    private onPointerMove_;
    private onPointerUp_;
}
export {};
