import { Value } from '../../../common/model/value';
import { ValueMap } from '../../../common/model/value-map';
import { ViewProps } from '../../../common/model/view-props';
import { View } from '../../../common/view/view';
import { Formatter } from '../../converter/formatter';
export declare type NumberTextProps = ValueMap<{
    draggingScale: number;
    formatter: Formatter<number>;
}>;
interface NumberConfig {
    dragging: Value<number | null>;
    props: NumberTextProps;
    value: Value<number>;
    viewProps: ViewProps;
    arrayPosition?: 'fst' | 'mid' | 'lst';
}
export declare class NumberTextView implements View {
    readonly inputElement: HTMLInputElement;
    readonly knobElement: HTMLElement;
    readonly element: HTMLElement;
    readonly value: Value<number>;
    private readonly props_;
    private readonly dragging_;
    private readonly guideBodyElem_;
    private readonly guideHeadElem_;
    private readonly tooltipElem_;
    constructor(doc: Document, config: NumberConfig);
    private onDraggingChange_;
    refresh(): void;
    private onChange_;
}
export {};
