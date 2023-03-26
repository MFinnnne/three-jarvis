import { ValueMap } from '../../../common/model/value-map';
import { ViewProps } from '../../../common/model/view-props';
import { View } from '../../../common/view/view';
export type ButtonPropsObject = {
    title: string | undefined;
};
export type ButtonProps = ValueMap<ButtonPropsObject>;
interface Config {
    props: ButtonProps;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class ButtonView implements View {
    readonly element: HTMLElement;
    readonly buttonElement: HTMLButtonElement;
    constructor(doc: Document, config: Config);
}
export {};
