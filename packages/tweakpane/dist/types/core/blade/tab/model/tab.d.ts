import { Value } from '../../../common/model/value';
export declare class Tab {
    readonly empty: Value<boolean>;
    readonly selectedIndex: Value<number>;
    private readonly items_;
    constructor();
    add(item: Value<boolean>, opt_index?: number): void;
    remove(item: Value<boolean>): void;
    private keepSelection_;
    private onItemSelectedChange_;
}
