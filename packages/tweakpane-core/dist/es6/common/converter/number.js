"use strict";
exports.__esModule = true;
exports.createNumberFormatter = exports.numberToString = exports.numberFromUnknown = exports.parseNumber = void 0;
var type_util_1 = require("../../misc/type-util");
var parser_1 = require("./ecma/parser");
/**
 * @hidden
 */
function parseNumber(text) {
    var _a;
    var r = parser_1.parseEcmaNumberExpression(text);
    return (_a = r === null || r === void 0 ? void 0 : r.evaluate()) !== null && _a !== void 0 ? _a : null;
}
exports.parseNumber = parseNumber;
/**
 * @hidden
 */
function numberFromUnknown(value) {
    if (typeof value === 'number') {
        return value;
    }
    if (typeof value === 'string') {
        var pv = parseNumber(value);
        if (!type_util_1.isEmpty(pv)) {
            return pv;
        }
    }
    return 0;
}
exports.numberFromUnknown = numberFromUnknown;
/**
 * @hidden
 */
function numberToString(value) {
    return String(value);
}
exports.numberToString = numberToString;
/**
 * @hidden
 */
function createNumberFormatter(digits) {
    return function (value) {
        return value.toFixed(Math.max(Math.min(digits, 20), 0));
    };
}
exports.createNumberFormatter = createNumberFormatter;
