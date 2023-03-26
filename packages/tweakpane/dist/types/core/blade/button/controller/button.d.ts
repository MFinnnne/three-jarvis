import { Controller } from '../../../common/controller/controller';
import { Emitter } from '../../../common/model/emitter';
import { ViewProps } from '../../../common/model/view-props';
import { ButtonProps, ButtonView } from '../view/button';
/**
 * @hidden
 */
export interface ButtonEvents {
    click: {
        sender: ButtonController;
    };
}
interface Config {
    props: ButtonProps;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class ButtonController implements Controller<ButtonView> {
    readonly emitter: Emitter<ButtonEvents>;
    readonly props: ButtonProps;
    readonly view: ButtonView;
    readonly viewProps: ViewProps;
    constructor(doc: Document, config: Config);
    private onClick_;
}
export {};