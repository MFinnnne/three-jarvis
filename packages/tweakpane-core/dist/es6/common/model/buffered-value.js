"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.createPushedBuffer = exports.initializeBuffer = void 0;
var type_util_1 = require("../../misc/type-util");
var values_1 = require("./values");
function fillBuffer(buffer, bufferSize) {
    while (buffer.length < bufferSize) {
        buffer.push(undefined);
    }
}
/**
 * @hidden
 */
function initializeBuffer(bufferSize) {
    var buffer = [];
    fillBuffer(buffer, bufferSize);
    return values_1.createValue(buffer);
}
exports.initializeBuffer = initializeBuffer;
function createTrimmedBuffer(buffer) {
    var index = buffer.indexOf(undefined);
    return type_util_1.forceCast(index < 0 ? buffer : buffer.slice(0, index));
}
/**
 * @hidden
 */
function createPushedBuffer(buffer, newValue) {
    var newBuffer = __spreadArray(__spreadArray([], createTrimmedBuffer(buffer)), [newValue]);
    if (newBuffer.length > buffer.length) {
        newBuffer.splice(0, newBuffer.length - buffer.length);
    }
    else {
        fillBuffer(newBuffer, buffer.length);
    }
    return newBuffer;
}
exports.createPushedBuffer = createPushedBuffer;
