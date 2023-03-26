"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorPickerView = void 0;
var class_name_1 = require("../../../common/view/class-name");
var className = class_name_1.ClassName('colp');
/**
 * @hidden
 */
var ColorPickerView = /** @class */ (function () {
    function ColorPickerView(doc, config) {
        this.alphaViews_ = null;
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        config.viewProps.bindClassModifiers(this.element);
        var hsvElem = doc.createElement('div');
        hsvElem.classList.add(className('hsv'));
        var svElem = doc.createElement('div');
        svElem.classList.add(className('sv'));
        this.svPaletteView_ = config.svPaletteView;
        svElem.appendChild(this.svPaletteView_.element);
        hsvElem.appendChild(svElem);
        var hElem = doc.createElement('div');
        hElem.classList.add(className('h'));
        this.hPaletteView_ = config.hPaletteView;
        hElem.appendChild(this.hPaletteView_.element);
        hsvElem.appendChild(hElem);
        this.element.appendChild(hsvElem);
        var rgbElem = doc.createElement('div');
        rgbElem.classList.add(className('rgb'));
        this.textView_ = config.textView;
        rgbElem.appendChild(this.textView_.element);
        this.element.appendChild(rgbElem);
        if (config.alphaViews) {
            this.alphaViews_ = {
                palette: config.alphaViews.palette,
                text: config.alphaViews.text,
            };
            var aElem = doc.createElement('div');
            aElem.classList.add(className('a'));
            var apElem = doc.createElement('div');
            apElem.classList.add(className('ap'));
            apElem.appendChild(this.alphaViews_.palette.element);
            aElem.appendChild(apElem);
            var atElem = doc.createElement('div');
            atElem.classList.add(className('at'));
            atElem.appendChild(this.alphaViews_.text.element);
            aElem.appendChild(atElem);
            this.element.appendChild(aElem);
        }
    }
    Object.defineProperty(ColorPickerView.prototype, "allFocusableElements", {
        get: function () {
            var elems = __spreadArray([this.svPaletteView_.element, this.hPaletteView_.element, this.textView_.modeSelectElement], this.textView_.textViews.map(function (v) { return v.inputElement; }));
            if (this.alphaViews_) {
                elems.push(this.alphaViews_.palette.element, this.alphaViews_.text.inputElement);
            }
            return elems;
        },
        enumerable: false,
        configurable: true
    });
    return ColorPickerView;
}());
exports.ColorPickerView = ColorPickerView;
