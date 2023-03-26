import { Controller } from '../common/controller/controller';
import { ViewProps } from '../common/model/view-props';
import { BaseBladeParams } from '../common/params';
import { PlainView } from '../common/view/plain';
import { View } from '../common/view/view';
import { CheckboxController } from '../input-binding/boolean/controller/checkbox';
import { BladeApi } from './common/api/blade';
import { BladeController } from './common/controller/blade';
import { LabelController } from './label/controller/label';
import { BladePlugin } from './plugin';
declare class LabelableController implements Controller<View> {
    readonly viewProps: ViewProps;
    readonly view: PlainView;
    constructor(doc: Document);
}
export declare function createEmptyLabelableController(doc: Document): LabelableController;
export declare function createLabelController(doc: Document, vc: LabelableController): LabelController<LabelableController>;
export declare function createEmptyBladeController(doc: Document): BladeController<PlainView>;
export declare class TestValueBladeApi extends BladeApi<LabelController<CheckboxController>> {
    get value(): boolean;
    set value(value: boolean);
}
interface TestBladeParams extends BaseBladeParams {
    view: 'test';
}
export declare const TestValueBladePlugin: BladePlugin<TestBladeParams>;
export {};
