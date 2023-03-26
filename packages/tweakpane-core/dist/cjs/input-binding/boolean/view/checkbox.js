"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboxView = void 0;
var dom_util_1 = require("../../../common/dom-util");
var class_name_1 = require("../../../common/view/class-name");
var className = class_name_1.ClassName('ckb');
/**
 * @hidden
 */
var CheckboxView = /** @class */ (function () {
    function CheckboxView(doc, config) {
        this.onValueChange_ = this.onValueChange_.bind(this);
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        config.viewProps.bindClassModifiers(this.element);
        var labelElem = doc.createElement('label');
        labelElem.classList.add(className('l'));
        this.element.appendChild(labelElem);
        var inputElem = doc.createElement('input');
        inputElem.classList.add(className('i'));
        inputElem.type = 'checkbox';
        labelElem.appendChild(inputElem);
        this.inputElement = inputElem;
        config.viewProps.bindDisabled(this.inputElement);
        var wrapperElem = doc.createElement('div');
        wrapperElem.classList.add(className('w'));
        labelElem.appendChild(wrapperElem);
        var markElem = dom_util_1.createSvgIconElement(doc, 'check');
        wrapperElem.appendChild(markElem);
        config.value.emitter.on('change', this.onValueChange_);
        this.value = config.value;
        this.update_();
    }
    CheckboxView.prototype.update_ = function () {
        this.inputElement.checked = this.value.rawValue;
    };
    CheckboxView.prototype.onValueChange_ = function () {
        this.update_();
    };
    return CheckboxView;
}());
exports.CheckboxView = CheckboxView;
