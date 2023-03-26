"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HPaletteView = void 0;
var number_util_1 = require("../../../common/number-util");
var class_name_1 = require("../../../common/view/class-name");
var color_string_1 = require("../converter/color-string");
var color_1 = require("../model/color");
var className = class_name_1.ClassName('hpl');
/**
 * @hidden
 */
var HPaletteView = /** @class */ (function () {
    function HPaletteView(doc, config) {
        this.onValueChange_ = this.onValueChange_.bind(this);
        this.value = config.value;
        this.value.emitter.on('change', this.onValueChange_);
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        config.viewProps.bindClassModifiers(this.element);
        config.viewProps.bindTabIndex(this.element);
        var colorElem = doc.createElement('div');
        colorElem.classList.add(className('c'));
        this.element.appendChild(colorElem);
        var markerElem = doc.createElement('div');
        markerElem.classList.add(className('m'));
        this.element.appendChild(markerElem);
        this.markerElem_ = markerElem;
        this.update_();
    }
    HPaletteView.prototype.update_ = function () {
        var c = this.value.rawValue;
        var h = c.getComponents('hsv')[0];
        this.markerElem_.style.backgroundColor = color_string_1.colorToFunctionalRgbString(new color_1.Color([h, 100, 100], 'hsv'));
        var left = number_util_1.mapRange(h, 0, 360, 0, 100);
        this.markerElem_.style.left = left + "%";
    };
    HPaletteView.prototype.onValueChange_ = function () {
        this.update_();
    };
    return HPaletteView;
}());
exports.HPaletteView = HPaletteView;
