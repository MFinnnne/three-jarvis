import { ViewProps } from '../../../common/model/view-props';
import { PlainView } from '../../../common/view/plain';
import { BladeController } from '../../common/controller/blade';
import { Blade } from '../../common/model/blade';
import { BladeRack } from '../../common/model/blade-rack';
interface Config {
    blade: Blade;
    viewProps: ViewProps;
    root?: boolean;
}
export declare class RackController extends BladeController<PlainView> {
    readonly rack: BladeRack;
    constructor(doc: Document, config: Config);
    private onRackAdd_;
    private onRackRemove_;
}
export {};
