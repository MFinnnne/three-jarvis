import { Controller } from '../../../common/controller/controller';
import { View } from '../../../common/view/view';
import { BladeController } from '../../common/controller/blade';
import { Blade } from '../../common/model/blade';
import { LabelProps, LabelView } from '../view/label';
interface Config<C extends Controller<View>> {
    blade: Blade;
    props: LabelProps;
    valueController: C;
}
export declare class LabelController<C extends Controller<View>> extends BladeController<LabelView> {
    readonly props: LabelProps;
    readonly valueController: C;
    constructor(doc: Document, config: Config<C>);
}
export {};
