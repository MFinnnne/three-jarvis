"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APaletteView = void 0;
var number_util_1 = require("../../../common/number-util");
var class_name_1 = require("../../../common/view/class-name");
var color_string_1 = require("../converter/color-string");
var color_1 = require("../model/color");
var className = class_name_1.ClassName('apl');
/**
 * @hidden
 */
var APaletteView = /** @class */ (function () {
    function APaletteView(doc, config) {
        this.onValueChange_ = this.onValueChange_.bind(this);
        this.value = config.value;
        this.value.emitter.on('change', this.onValueChange_);
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        config.viewProps.bindClassModifiers(this.element);
        config.viewProps.bindTabIndex(this.element);
        var barElem = doc.createElement('div');
        barElem.classList.add(className('b'));
        this.element.appendChild(barElem);
        var colorElem = doc.createElement('div');
        colorElem.classList.add(className('c'));
        barElem.appendChild(colorElem);
        this.colorElem_ = colorElem;
        var markerElem = doc.createElement('div');
        markerElem.classList.add(className('m'));
        this.element.appendChild(markerElem);
        this.markerElem_ = markerElem;
        var previewElem = doc.createElement('div');
        previewElem.classList.add(className('p'));
        this.markerElem_.appendChild(previewElem);
        this.previewElem_ = previewElem;
        this.update_();
    }
    APaletteView.prototype.update_ = function () {
        var c = this.value.rawValue;
        var rgbaComps = c.getComponents('rgb');
        var leftColor = new color_1.Color([rgbaComps[0], rgbaComps[1], rgbaComps[2], 0], 'rgb');
        var rightColor = new color_1.Color([rgbaComps[0], rgbaComps[1], rgbaComps[2], 255], 'rgb');
        var gradientComps = ['to right', color_string_1.colorToFunctionalRgbaString(leftColor), color_string_1.colorToFunctionalRgbaString(rightColor)];
        this.colorElem_.style.background = "linear-gradient(" + gradientComps.join(',') + ")";
        this.previewElem_.style.backgroundColor = color_string_1.colorToFunctionalRgbaString(c);
        var left = number_util_1.mapRange(rgbaComps[3], 0, 1, 0, 100);
        this.markerElem_.style.left = left + "%";
    };
    APaletteView.prototype.onValueChange_ = function () {
        this.update_();
    };
    return APaletteView;
}());
exports.APaletteView = APaletteView;
