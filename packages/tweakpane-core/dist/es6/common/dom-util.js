"use strict";
exports.__esModule = true;
exports.findNextTarget = exports.indexOfChildElement = exports.removeChildNodes = exports.removeChildElements = exports.removeElement = exports.insertElementAt = exports.createSvgIconElement = exports.getCanvasContext = exports.getWindowDocument = exports.supportsTouch = exports.disableTransitionTemporarily = exports.forceReflow = exports.SVG_NS = void 0;
var type_util_1 = require("../misc/type-util");
exports.SVG_NS = 'http://www.w3.org/2000/svg';
function forceReflow(element) {
    element.offsetHeight;
}
exports.forceReflow = forceReflow;
function disableTransitionTemporarily(element, callback) {
    var t = element.style.transition;
    element.style.transition = 'none';
    callback();
    element.style.transition = t;
}
exports.disableTransitionTemporarily = disableTransitionTemporarily;
function supportsTouch(doc) {
    return doc.ontouchstart !== undefined;
}
exports.supportsTouch = supportsTouch;
function getGlobalObject() {
    return globalThis;
}
function getWindowDocument() {
    var globalObj = type_util_1.forceCast(getGlobalObject());
    return globalObj.document;
}
exports.getWindowDocument = getWindowDocument;
function getCanvasContext(canvasElement) {
    var win = canvasElement.ownerDocument.defaultView;
    if (!win) {
        return null;
    }
    // HTMLCanvasElement.prototype.getContext is not defined on testing environment
    var isBrowser = 'document' in win;
    return isBrowser
        ? canvasElement.getContext('2d', {
            willReadFrequently: true
        })
        : null;
}
exports.getCanvasContext = getCanvasContext;
var ICON_ID_TO_INNER_HTML_MAP = {
    check: '<path d="M2 8l4 4l8 -8"/>',
    dropdown: '<path d="M5 7h6l-3 3 z"/>',
    p2dpad: '<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'
};
function createSvgIconElement(document, iconId) {
    var elem = document.createElementNS(exports.SVG_NS, 'svg');
    elem.innerHTML = ICON_ID_TO_INNER_HTML_MAP[iconId];
    return elem;
}
exports.createSvgIconElement = createSvgIconElement;
function insertElementAt(parentElement, element, index) {
    parentElement.insertBefore(element, parentElement.children[index]);
}
exports.insertElementAt = insertElementAt;
function removeElement(element) {
    if (element.parentElement) {
        element.parentElement.removeChild(element);
    }
}
exports.removeElement = removeElement;
function removeChildElements(element) {
    while (element.children.length > 0) {
        element.removeChild(element.children[0]);
    }
}
exports.removeChildElements = removeChildElements;
function removeChildNodes(element) {
    while (element.childNodes.length > 0) {
        element.removeChild(element.childNodes[0]);
    }
}
exports.removeChildNodes = removeChildNodes;
function indexOfChildElement(element) {
    var parentElem = element.parentElement;
    if (!parentElem) {
        return -1;
    }
    var children = Array.prototype.slice.call(parentElem.children);
    return children.indexOf(element);
}
exports.indexOfChildElement = indexOfChildElement;
function findNextTarget(ev) {
    if (ev.relatedTarget) {
        return type_util_1.forceCast(ev.relatedTarget);
    }
    // Workaround for Firefox
    if ('explicitOriginalTarget' in ev) {
        return ev.explicitOriginalTarget;
    }
    // TODO: Workaround for Safari
    // Safari doesn't set next target for some elements
    // (e.g. button, input[type=checkbox], etc.)
    return null;
}
exports.findNextTarget = findNextTarget;
