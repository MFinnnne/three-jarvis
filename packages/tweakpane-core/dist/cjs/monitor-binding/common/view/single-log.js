"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleLogView = void 0;
var class_name_1 = require("../../../common/view/class-name");
var className = class_name_1.ClassName('sgl');
/**
 * @hidden
 */
var SingleLogView = /** @class */ (function () {
    function SingleLogView(doc, config) {
        this.onValueUpdate_ = this.onValueUpdate_.bind(this);
        this.formatter_ = config.formatter;
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        config.viewProps.bindClassModifiers(this.element);
        var inputElem = doc.createElement('input');
        inputElem.classList.add(className('i'));
        inputElem.readOnly = true;
        inputElem.type = 'text';
        config.viewProps.bindDisabled(inputElem);
        this.element.appendChild(inputElem);
        this.inputElement = inputElem;
        config.value.emitter.on('change', this.onValueUpdate_);
        this.value = config.value;
        this.update_();
    }
    SingleLogView.prototype.update_ = function () {
        var values = this.value.rawValue;
        var lastValue = values[values.length - 1];
        this.inputElement.value = lastValue !== undefined ? this.formatter_(lastValue) : '';
    };
    SingleLogView.prototype.onValueUpdate_ = function () {
        this.update_();
    };
    return SingleLogView;
}());
exports.SingleLogView = SingleLogView;
