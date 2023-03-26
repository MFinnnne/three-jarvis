import { ValueController } from '../../../common/controller/value';
import { View } from '../../../common/view/view';
import { ValueBladeController } from '../../common/controller/value-blade';
import { Blade } from '../../common/model/blade';
import { LabelProps, LabelView } from '../view/label';
interface Config<T, C extends ValueController<T, View>> {
    blade: Blade;
    props: LabelProps;
    valueController: C;
}
export declare class LabeledValueController<T, C extends ValueController<T, View>> extends ValueBladeController<T, LabelView> {
    readonly props: LabelProps;
    readonly valueController: C;
    constructor(doc: Document, config: Config<T, C>);
}
export {};
