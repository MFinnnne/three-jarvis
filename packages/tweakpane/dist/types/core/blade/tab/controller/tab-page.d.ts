import { ValueMap } from '../../../common/model/value-map';
import { RackController } from '../../rack/controller/rack';
import { TabItemProps } from '../view/tab-item';
import { TabItemController } from './tab-item';
export declare type TabPagePropsObject = {
    selected: boolean;
};
export declare type TabPageProps = ValueMap<TabPagePropsObject>;
interface Config {
    itemProps: TabItemProps;
    props: TabPageProps;
}
export declare class TabPageController {
    readonly props: TabPageProps;
    private readonly ic_;
    private readonly cc_;
    constructor(doc: Document, config: Config);
    get itemController(): TabItemController;
    get contentController(): RackController;
    private onItemClick_;
}
export {};
