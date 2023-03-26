"use strict";
exports.__esModule = true;
exports.ButtonView = void 0;
var class_name_1 = require("../../../common/view/class-name");
var reactive_1 = require("../../../common/view/reactive");
var className = class_name_1.ClassName('btn');
/**
 * @hidden
 */
var ButtonView = /** @class */ (function () {
    function ButtonView(doc, config) {
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        config.viewProps.bindClassModifiers(this.element);
        var buttonElem = doc.createElement('button');
        buttonElem.classList.add(className('b'));
        config.viewProps.bindDisabled(buttonElem);
        this.element.appendChild(buttonElem);
        this.buttonElement = buttonElem;
        var titleElem = doc.createElement('div');
        titleElem.classList.add(className('t'));
        reactive_1.bindValueToTextContent(config.props.value('title'), titleElem);
        this.buttonElement.appendChild(titleElem);
    }
    return ButtonView;
}());
exports.ButtonView = ButtonView;
