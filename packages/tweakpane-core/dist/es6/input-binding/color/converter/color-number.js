"use strict";
exports.__esModule = true;
exports.colorFromRgbaNumber = exports.colorFromRgbNumber = exports.numberToRgbaColor = exports.numberToRgbColor = exports.colorToRgbaNumber = exports.colorToRgbNumber = exports.colorFromObject = void 0;
var number_util_1 = require("../../../common/number-util");
var color_1 = require("../model/color");
var color_model_1 = require("../model/color-model");
// TODO: Make type required in the next major version
/**
 * @hidden
 */
function colorFromObject(value, opt_type) {
    if (color_1.Color.isColorObject(value)) {
        return color_1.Color.fromObject(value, opt_type);
    }
    return color_1.Color.black(opt_type);
}
exports.colorFromObject = colorFromObject;
/**
 * @hidden
 */
function colorToRgbNumber(value) {
    return color_model_1.removeAlphaComponent(value.getComponents('rgb')).reduce(function (result, comp) {
        return (result << 8) | (Math.floor(comp) & 0xff);
    }, 0);
}
exports.colorToRgbNumber = colorToRgbNumber;
/**
 * @hidden
 */
function colorToRgbaNumber(value) {
    return (value.getComponents('rgb').reduce(function (result, comp, index) {
        var hex = Math.floor(index === 3 ? comp * 255 : comp) & 0xff;
        return (result << 8) | hex;
    }, 0) >>> 0);
}
exports.colorToRgbaNumber = colorToRgbaNumber;
/**
 * @hidden
 */
function numberToRgbColor(num) {
    return new color_1.Color([(num >> 16) & 0xff, (num >> 8) & 0xff, num & 0xff], 'rgb');
}
exports.numberToRgbColor = numberToRgbColor;
/**
 * @hidden
 */
function numberToRgbaColor(num) {
    return new color_1.Color([(num >> 24) & 0xff, (num >> 16) & 0xff, (num >> 8) & 0xff, number_util_1.mapRange(num & 0xff, 0, 255, 0, 1)], 'rgb');
}
exports.numberToRgbaColor = numberToRgbaColor;
/**
 * @hidden
 */
function colorFromRgbNumber(value) {
    if (typeof value !== 'number') {
        return color_1.Color.black();
    }
    return numberToRgbColor(value);
}
exports.colorFromRgbNumber = colorFromRgbNumber;
/**
 * @hidden
 */
function colorFromRgbaNumber(value) {
    if (typeof value !== 'number') {
        return color_1.Color.black();
    }
    return numberToRgbaColor(value);
}
exports.colorFromRgbaNumber = colorFromRgbaNumber;
