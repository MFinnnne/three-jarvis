"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorSwatchView = void 0;
var class_name_1 = require("../../../common/view/class-name");
var color_string_1 = require("../converter/color-string");
var className = class_name_1.ClassName('colsw');
/**
 * @hidden
 */
var ColorSwatchView = /** @class */ (function () {
    function ColorSwatchView(doc, config) {
        this.onValueChange_ = this.onValueChange_.bind(this);
        config.value.emitter.on('change', this.onValueChange_);
        this.value = config.value;
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        config.viewProps.bindClassModifiers(this.element);
        var swatchElem = doc.createElement('div');
        swatchElem.classList.add(className('sw'));
        this.element.appendChild(swatchElem);
        this.swatchElem_ = swatchElem;
        var buttonElem = doc.createElement('button');
        buttonElem.classList.add(className('b'));
        config.viewProps.bindDisabled(buttonElem);
        this.element.appendChild(buttonElem);
        this.buttonElement = buttonElem;
        this.update_();
    }
    ColorSwatchView.prototype.update_ = function () {
        var value = this.value.rawValue;
        this.swatchElem_.style.backgroundColor = color_string_1.colorToHexRgbaString(value);
    };
    ColorSwatchView.prototype.onValueChange_ = function () {
        this.update_();
    };
    return ColorSwatchView;
}());
exports.ColorSwatchView = ColorSwatchView;
