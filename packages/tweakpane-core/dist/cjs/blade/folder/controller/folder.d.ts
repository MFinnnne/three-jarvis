import { ViewProps } from '../../../common/model/view-props';
import { RackLikeController } from '../../common/controller/rack-like';
import { Blade } from '../../common/model/blade';
import { Foldable } from '../../common/model/foldable';
import { FolderProps, FolderView } from '../view/folder';
interface Config {
    expanded?: boolean;
    blade: Blade;
    props: FolderProps;
    viewProps: ViewProps;
    root?: boolean;
}
/**
 * @hidden
 */
export declare class FolderController extends RackLikeController<FolderView> {
    readonly foldable: Foldable;
    readonly props: FolderProps;
    constructor(doc: Document, config: Config);
    get document(): Document;
    private onTitleClick_;
}
export {};
