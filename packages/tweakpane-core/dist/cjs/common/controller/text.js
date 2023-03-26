"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextController = void 0;
var type_util_1 = require("../../misc/type-util");
var text_1 = require("../view/text");
var TextController = /** @class */ (function () {
    function TextController(doc, config) {
        this.onInputChange_ = this.onInputChange_.bind(this);
        this.parser_ = config.parser;
        this.props = config.props;
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.view = new text_1.TextView(doc, {
            props: config.props,
            value: this.value,
            viewProps: this.viewProps,
        });
        this.view.inputElement.addEventListener('change', this.onInputChange_);
    }
    TextController.prototype.onInputChange_ = function (e) {
        var inputElem = type_util_1.forceCast(e.currentTarget);
        var value = inputElem.value;
        var parsedValue = this.parser_(value);
        if (!type_util_1.isEmpty(parsedValue)) {
            this.value.rawValue = parsedValue;
        }
        this.view.refresh();
    };
    return TextController;
}());
exports.TextController = TextController;
