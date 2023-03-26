import { ViewProps } from '../../../common/model/view-props';
import { RackLikeController } from '../../common/controller/rack-like';
import { Blade } from '../../common/model/blade';
import { NestedOrderedSet } from '../../common/model/nested-ordered-set';
import { Tab } from '../model/tab';
import { TabView } from '../view/tab';
import { TabPageController } from './tab-page';
interface Config {
    blade: Blade;
    viewProps: ViewProps;
}
export declare class TabController extends RackLikeController<TabView> {
    private readonly pageSet_;
    readonly tab: Tab;
    constructor(doc: Document, config: Config);
    get pageSet(): NestedOrderedSet<TabPageController>;
    add(pc: TabPageController, opt_index?: number): void;
    remove(index: number): void;
    private onPageAdd_;
    private onPageRemove_;
}
export {};
