import { View } from '../../../common/view/view';
import { RackController } from '../../rack/controller/rack';
import { Blade } from '../model/blade';
import { BladeController } from './blade';
interface Config<V extends View> {
    blade: Blade;
    rackController: RackController;
    view: V;
}
export declare class RackLikeController<V extends View> extends BladeController<V> {
    readonly rackController: RackController;
    constructor(config: Config<V>);
}
export {};
