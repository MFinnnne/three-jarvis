import { View } from '../../../common/view/view';
import { BladeController } from '../controller/blade';
export declare class BladeApi<C extends BladeController<View>> {
    /**
     * @hidden
     */
    readonly controller_: C;
    /**
     * @hidden
     */
    constructor(controller: C);
    get element(): HTMLElement;
    get disabled(): boolean;
    set disabled(disabled: boolean);
    get hidden(): boolean;
    set hidden(hidden: boolean);
    dispose(): void;
}
