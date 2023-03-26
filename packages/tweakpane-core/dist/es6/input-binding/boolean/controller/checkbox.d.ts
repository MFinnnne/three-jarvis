import { ValueController } from '../../../common/controller/value';
import { Value } from '../../../common/model/value';
import { ViewProps } from '../../../common/model/view-props';
import { CheckboxView } from '../view/checkbox';
/**
 * @hidden
 */
interface Config {
    value: Value<boolean>;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class CheckboxController implements ValueController<boolean, CheckboxView> {
    readonly value: Value<boolean>;
    readonly view: CheckboxView;
    readonly viewProps: ViewProps;
    constructor(doc: Document, config: Config);
    private onInputChange_;
}
export {};
