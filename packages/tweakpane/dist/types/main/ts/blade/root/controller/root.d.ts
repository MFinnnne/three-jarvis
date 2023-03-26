import { Blade, FolderController, FolderProps, ViewProps } from '../../../../../core/index';
interface Config {
    blade: Blade;
    props: FolderProps;
    viewProps: ViewProps;
    expanded?: boolean;
    title?: string;
}
export declare class RootController extends FolderController {
    constructor(doc: Document, config: Config);
}
export {};
