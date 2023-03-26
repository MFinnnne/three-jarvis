import { ValueMap } from '../../../common/model/value-map';
import { BladePosition } from './blade-positions';
export declare type Blade = ValueMap<{
    positions: BladePosition[];
}>;
export declare function createBlade(): Blade;
