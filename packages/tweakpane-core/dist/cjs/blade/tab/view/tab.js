"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabView = void 0;
var reactive_1 = require("../../../common/model/reactive");
var class_name_1 = require("../../../common/view/class-name");
var reactive_2 = require("../../../common/view/reactive");
var blade_container_1 = require("../../common/view/blade-container");
var className = class_name_1.ClassName('tab');
var TabView = /** @class */ (function () {
    function TabView(doc, config) {
        this.element = doc.createElement('div');
        this.element.classList.add(className(), blade_container_1.bladeContainerClassName());
        config.viewProps.bindClassModifiers(this.element);
        reactive_1.bindValue(config.empty, reactive_2.valueToClassName(this.element, className(undefined, 'nop')));
        var titleElem = doc.createElement('div');
        titleElem.classList.add(className('t'));
        this.element.appendChild(titleElem);
        this.itemsElement = titleElem;
        var indentElem = doc.createElement('div');
        indentElem.classList.add(className('i'));
        this.element.appendChild(indentElem);
        var contentsElem = config.contentsElement;
        contentsElem.classList.add(className('c'));
        this.element.appendChild(contentsElem);
        this.contentsElement = contentsElem;
    }
    return TabView;
}());
exports.TabView = TabView;
