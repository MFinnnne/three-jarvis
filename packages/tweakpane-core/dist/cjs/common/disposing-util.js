"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disposeElement = void 0;
function disposeElement(elem) {
    if (elem && elem.parentElement) {
        elem.parentElement.removeChild(elem);
    }
    return null;
}
exports.disposeElement = disposeElement;
