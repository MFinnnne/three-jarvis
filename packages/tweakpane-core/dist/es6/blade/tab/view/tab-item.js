"use strict";
exports.__esModule = true;
exports.TabItemView = void 0;
var reactive_1 = require("../../../common/model/reactive");
var class_name_1 = require("../../../common/view/class-name");
var reactive_2 = require("../../../common/view/reactive");
var className = class_name_1.ClassName('tbi');
/**
 * @hidden
 */
var TabItemView = /** @class */ (function () {
    function TabItemView(doc, config) {
        var _this = this;
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        config.viewProps.bindClassModifiers(this.element);
        reactive_1.bindValueMap(config.props, 'selected', function (selected) {
            if (selected) {
                _this.element.classList.add(className(undefined, 'sel'));
            }
            else {
                _this.element.classList.remove(className(undefined, 'sel'));
            }
        });
        var buttonElem = doc.createElement('button');
        buttonElem.classList.add(className('b'));
        config.viewProps.bindDisabled(buttonElem);
        this.element.appendChild(buttonElem);
        this.buttonElement = buttonElem;
        var titleElem = doc.createElement('div');
        titleElem.classList.add(className('t'));
        reactive_2.bindValueToTextContent(config.props.value('title'), titleElem);
        this.buttonElement.appendChild(titleElem);
        this.titleElement = titleElem;
    }
    return TabItemView;
}());
exports.TabItemView = TabItemView;
