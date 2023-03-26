"use strict";
exports.__esModule = true;
exports.bindValueToTextContent = exports.valueToClassName = void 0;
var reactive_1 = require("../model/reactive");
function applyClass(elem, className, active) {
    if (active) {
        elem.classList.add(className);
    }
    else {
        elem.classList.remove(className);
    }
}
function valueToClassName(elem, className) {
    return function (value) {
        applyClass(elem, className, value);
    };
}
exports.valueToClassName = valueToClassName;
function bindValueToTextContent(value, elem) {
    reactive_1.bindValue(value, function (text) {
        elem.textContent = text !== null && text !== void 0 ? text : '';
    });
}
exports.bindValueToTextContent = bindValueToTextContent;
