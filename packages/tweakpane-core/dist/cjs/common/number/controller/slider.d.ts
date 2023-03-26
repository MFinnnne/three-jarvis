import { Controller } from '../../controller/controller';
import { Value } from '../../model/value';
import { ViewProps } from '../../model/view-props';
import { SliderProps, SliderView } from '../view/slider';
interface Config {
    baseStep: number;
    props: SliderProps;
    value: Value<number>;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class SliderController implements Controller<SliderView> {
    readonly value: Value<number>;
    readonly view: SliderView;
    readonly viewProps: ViewProps;
    readonly props: SliderProps;
    private readonly ptHandler_;
    private readonly baseStep_;
    constructor(doc: Document, config: Config);
    private handlePointerEvent_;
    private onPointerDownOrMove_;
    private onPointerUp_;
    private onKeyDown_;
    private onKeyUp_;
}
export {};
