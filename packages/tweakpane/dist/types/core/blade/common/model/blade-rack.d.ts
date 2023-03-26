import { Emitter } from '../../../common/model/emitter';
import { ValueChangeOptions } from '../../../common/model/value';
import { ViewProps } from '../../../common/model/view-props';
import { View } from '../../../common/view/view';
import { Class } from '../../../misc/type-util';
import { BladeController } from '../controller/blade';
import { Blade } from './blade';
/**
 * @hidden
 */
export interface BladeRackEvents {
    add: {
        bladeController: BladeController<View>;
        index: number;
        isRoot: boolean;
        sender: BladeRack;
    };
    remove: {
        bladeController: BladeController<View>;
        isRoot: boolean;
        sender: BladeRack;
    };
    inputchange: {
        bladeController: BladeController<View>;
        options: ValueChangeOptions;
        sender: BladeRack;
    };
    layout: {
        sender: BladeRack;
    };
    monitorupdate: {
        bladeController: BladeController<View>;
        sender: BladeRack;
    };
}
interface Config {
    blade?: Blade;
    viewProps: ViewProps;
}
/**
 * A collection of blade controllers that manages positions and event propagation.
 */
export declare class BladeRack {
    readonly emitter: Emitter<BladeRackEvents>;
    readonly viewProps: ViewProps;
    private readonly blade_;
    private readonly bcSet_;
    constructor(config: Config);
    get children(): BladeController<View>[];
    add(bc: BladeController<View>, opt_index?: number): void;
    remove(bc: BladeController<View>): void;
    find<B extends BladeController<View>>(controllerClass: Class<B>): B[];
    private onSetAdd_;
    private onSetRemove_;
    private updatePositions_;
    private onChildPositionsChange_;
    private onChildViewPropsChange_;
    private onChildDispose_;
    private onChildInputChange_;
    private onChildMonitorUpdate_;
    private onChildValueChange_;
    private onDescendantLayout_;
    private onDescendantInputChange_;
    private onDescendantMonitorUpdate_;
    private onBladePositionsChange_;
}
export {};
