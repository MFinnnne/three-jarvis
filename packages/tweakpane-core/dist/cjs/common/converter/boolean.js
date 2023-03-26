"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanFormatter = exports.boolFromUnknown = exports.boolToString = void 0;
/**
 * @hidden
 */
function boolToString(value) {
    return String(value);
}
exports.boolToString = boolToString;
/**
 * @hidden
 */
function boolFromUnknown(value) {
    if (value === 'false') {
        return false;
    }
    return !!value;
}
exports.boolFromUnknown = boolFromUnknown;
/**
 * @hidden
 */
function BooleanFormatter(value) {
    return boolToString(value);
}
exports.BooleanFormatter = BooleanFormatter;
