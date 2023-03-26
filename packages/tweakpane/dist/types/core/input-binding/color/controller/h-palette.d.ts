import { Controller } from '../../../common/controller/controller';
import { Value } from '../../../common/model/value';
import { ViewProps } from '../../../common/model/view-props';
import { Color } from '../model/color';
import { HPaletteView } from '../view/h-palette';
interface Config {
    value: Value<Color>;
    viewProps: ViewProps;
}
/**
 * @hidden
 */
export declare class HPaletteController implements Controller<HPaletteView> {
    readonly value: Value<Color>;
    readonly view: HPaletteView;
    readonly viewProps: ViewProps;
    private readonly ptHandler_;
    constructor(doc: Document, config: Config);
    private handlePointerEvent_;
    private onPointerDown_;
    private onPointerMove_;
    private onPointerUp_;
    private onKeyDown_;
    private onKeyUp_;
}
export {};
