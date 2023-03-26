import { Value } from '../../../common/model/value';
import { ValueMap } from '../../../common/model/value-map';
import { ViewProps } from '../../../common/model/view-props';
import { View } from '../../../common/view/view';
export type SliderProps = ValueMap<{
    maxValue: number;
    minValue: number;
}>;
interface Config {
    props: SliderProps;
    value: Value<number>;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class SliderView implements View {
    readonly element: HTMLElement;
    readonly knobElement: HTMLDivElement;
    readonly trackElement: HTMLDivElement;
    readonly value: Value<number>;
    private readonly props_;
    constructor(doc: Document, config: Config);
    private update_;
    private onChange_;
}
export {};
