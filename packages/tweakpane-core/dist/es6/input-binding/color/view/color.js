"use strict";
exports.__esModule = true;
exports.ColorView = void 0;
var reactive_1 = require("../../../common/model/reactive");
var class_name_1 = require("../../../common/view/class-name");
var reactive_2 = require("../../../common/view/reactive");
var className = class_name_1.ClassName('col');
/**
 * @hidden
 */
var ColorView = /** @class */ (function () {
    function ColorView(doc, config) {
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        config.foldable.bindExpandedClass(this.element, className(undefined, 'expanded'));
        reactive_1.bindValueMap(config.foldable, 'completed', reactive_2.valueToClassName(this.element, className(undefined, 'cpl')));
        var headElem = doc.createElement('div');
        headElem.classList.add(className('h'));
        this.element.appendChild(headElem);
        var swatchElem = doc.createElement('div');
        swatchElem.classList.add(className('s'));
        headElem.appendChild(swatchElem);
        this.swatchElement = swatchElem;
        var textElem = doc.createElement('div');
        textElem.classList.add(className('t'));
        headElem.appendChild(textElem);
        this.textElement = textElem;
        if (config.pickerLayout === 'inline') {
            var pickerElem = doc.createElement('div');
            pickerElem.classList.add(className('p'));
            this.element.appendChild(pickerElem);
            this.pickerElement = pickerElem;
        }
        else {
            this.pickerElement = null;
        }
    }
    return ColorView;
}());
exports.ColorView = ColorView;
