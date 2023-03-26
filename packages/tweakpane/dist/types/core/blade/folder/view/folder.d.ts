import { ValueMap } from '../../../common/model/value-map';
import { ViewProps } from '../../../common/model/view-props';
import { View } from '../../../common/view/view';
import { Foldable } from '../../common/model/foldable';
export declare type FolderPropsObject = {
    title: string | undefined;
};
export declare type FolderProps = ValueMap<FolderPropsObject>;
interface Config {
    containerElement: HTMLElement;
    foldable: Foldable;
    props: FolderProps;
    viewProps: ViewProps;
    viewName?: string;
}
/**
 * @hidden
 */
export declare class FolderView implements View {
    readonly buttonElement: HTMLButtonElement;
    readonly containerElement: HTMLElement;
    readonly titleElement: HTMLElement;
    readonly element: HTMLElement;
    private readonly foldable_;
    private readonly className_;
    constructor(doc: Document, config: Config);
}
export {};
