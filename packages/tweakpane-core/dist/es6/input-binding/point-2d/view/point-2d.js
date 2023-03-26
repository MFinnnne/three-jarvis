"use strict";
exports.__esModule = true;
exports.Point2dView = void 0;
var dom_util_1 = require("../../../common/dom-util");
var reactive_1 = require("../../../common/model/reactive");
var class_name_1 = require("../../../common/view/class-name");
var reactive_2 = require("../../../common/view/reactive");
var className = class_name_1.ClassName('p2d');
/**
 * @hidden
 */
var Point2dView = /** @class */ (function () {
    function Point2dView(doc, config) {
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        config.viewProps.bindClassModifiers(this.element);
        reactive_1.bindValue(config.expanded, reactive_2.valueToClassName(this.element, className(undefined, 'expanded')));
        var headElem = doc.createElement('div');
        headElem.classList.add(className('h'));
        this.element.appendChild(headElem);
        var buttonElem = doc.createElement('button');
        buttonElem.classList.add(className('b'));
        buttonElem.appendChild(dom_util_1.createSvgIconElement(doc, 'p2dpad'));
        config.viewProps.bindDisabled(buttonElem);
        headElem.appendChild(buttonElem);
        this.buttonElement = buttonElem;
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
    return Point2dView;
}());
exports.Point2dView = Point2dView;
