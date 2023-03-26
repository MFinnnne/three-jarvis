import { MonitorBinding } from '../../../common/binding/monitor';
import { Controller } from '../../../common/controller/controller';
import { View } from '../../../common/view/view';
import { Blade } from '../../common/model/blade';
import { LabelController } from '../../label/controller/label';
import { LabelProps } from '../../label/view/label';
interface Config<T> {
    binding: MonitorBinding<T>;
    blade: Blade;
    props: LabelProps;
    valueController: Controller<View>;
}
/**
 * @hidden
 */
export declare class MonitorBindingController<T> extends LabelController<Controller<View>> {
    readonly binding: MonitorBinding<T>;
    constructor(doc: Document, config: Config<T>);
}
export {};
