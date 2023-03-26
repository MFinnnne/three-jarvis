import { Controller } from '../../../common/controller/controller';
import { ViewProps } from '../../../common/model/view-props';
import { View } from '../../../common/view/view';
import { Blade } from '../model/blade';
import { BladeRack } from '../model/blade-rack';
interface Config<V extends View> {
    blade: Blade;
    view: V;
    viewProps: ViewProps;
}
export declare class BladeController<V extends View> implements Controller<V> {
    readonly blade: Blade;
    readonly view: V;
    readonly viewProps: ViewProps;
    private parent_;
    constructor(config: Config<V>);
    get parent(): BladeRack | null;
    set parent(parent: BladeRack | null);
}
export {};
