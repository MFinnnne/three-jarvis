"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopupView = void 0;
var reactive_1 = require("../model/reactive");
var class_name_1 = require("./class-name");
var reactive_2 = require("./reactive");
var className = class_name_1.ClassName('pop');
/**
 * @hidden
 */
var PopupView = /** @class */ (function () {
    function PopupView(doc, config) {
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        config.viewProps.bindClassModifiers(this.element);
        reactive_1.bindValue(config.shows, reactive_2.valueToClassName(this.element, className(undefined, 'v')));
    }
    return PopupView;
}());
exports.PopupView = PopupView;
