import { Controller } from '../../../common/controller/controller';
import { Emitter } from '../../../common/model/emitter';
import { ViewProps } from '../../../common/model/view-props';
import { TabItemProps, TabItemView } from '../view/tab-item';
/**
 * @hidden
 */
export interface TabItemEvents {
    click: {
        sender: TabItemController;
    };
}
interface Config {
    props: TabItemProps;
    viewProps: ViewProps;
}
export declare class TabItemController implements Controller<TabItemView> {
    readonly emitter: Emitter<TabItemEvents>;
    readonly props: TabItemProps;
    readonly view: TabItemView;
    readonly viewProps: ViewProps;
    constructor(doc: Document, config: Config);
    private onClick_;
}
export {};
