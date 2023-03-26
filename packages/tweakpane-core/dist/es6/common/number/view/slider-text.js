"use strict";
exports.__esModule = true;
exports.SliderTextView = void 0;
var class_name_1 = require("../../../common/view/class-name");
var className = class_name_1.ClassName('sldtxt');
/**
 * @hidden
 */
var SliderTextView = /** @class */ (function () {
    function SliderTextView(doc, config) {
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        var sliderElem = doc.createElement('div');
        sliderElem.classList.add(className('s'));
        this.sliderView_ = config.sliderView;
        sliderElem.appendChild(this.sliderView_.element);
        this.element.appendChild(sliderElem);
        var textElem = doc.createElement('div');
        textElem.classList.add(className('t'));
        this.textView_ = config.textView;
        textElem.appendChild(this.textView_.element);
        this.element.appendChild(textElem);
    }
    return SliderTextView;
}());
exports.SliderTextView = SliderTextView;
