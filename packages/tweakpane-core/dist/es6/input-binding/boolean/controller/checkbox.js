"use strict";
exports.__esModule = true;
exports.CheckboxController = void 0;
var type_util_1 = require("../../../misc/type-util");
var checkbox_1 = require("../view/checkbox");
/**
 * @hidden
 */
var CheckboxController = /** @class */ (function () {
    function CheckboxController(doc, config) {
        this.onInputChange_ = this.onInputChange_.bind(this);
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.view = new checkbox_1.CheckboxView(doc, {
            value: this.value,
            viewProps: this.viewProps
        });
        this.view.inputElement.addEventListener('change', this.onInputChange_);
    }
    CheckboxController.prototype.onInputChange_ = function (e) {
        var inputElem = type_util_1.forceCast(e.currentTarget);
        this.value.rawValue = inputElem.checked;
    };
    return CheckboxController;
}());
exports.CheckboxController = CheckboxController;
