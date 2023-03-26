"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createColorObjectWriter = exports.writeRgbColorObject = exports.writeRgbaColorObject = exports.createColorNumberWriter = exports.createColorStringWriter = void 0;
var primitive_1 = require("../../../common/primitive");
var color_number_1 = require("../converter/color-number");
var color_string_1 = require("../converter/color-string");
function createColorStringWriter(format) {
    var stringify = color_string_1.findColorStringifier(format);
    return stringify
        ? function (target, value) {
            primitive_1.writePrimitive(target, stringify(value));
        }
        : null;
}
exports.createColorStringWriter = createColorStringWriter;
function createColorNumberWriter(supportsAlpha) {
    var colorToNumber = supportsAlpha ? color_number_1.colorToRgbaNumber : color_number_1.colorToRgbNumber;
    return function (target, value) {
        primitive_1.writePrimitive(target, colorToNumber(value));
    };
}
exports.createColorNumberWriter = createColorNumberWriter;
// TODO: Make type required in the next version
function writeRgbaColorObject(target, value, opt_type) {
    var obj = value.toRgbaObject(opt_type);
    target.writeProperty('r', obj.r);
    target.writeProperty('g', obj.g);
    target.writeProperty('b', obj.b);
    target.writeProperty('a', obj.a);
}
exports.writeRgbaColorObject = writeRgbaColorObject;
// TODO: Make type required in the next version
function writeRgbColorObject(target, value, opt_type) {
    var obj = value.toRgbaObject(opt_type);
    target.writeProperty('r', obj.r);
    target.writeProperty('g', obj.g);
    target.writeProperty('b', obj.b);
}
exports.writeRgbColorObject = writeRgbColorObject;
// TODO: Make type required in the next version
function createColorObjectWriter(supportsAlpha, opt_type) {
    return function (target, inValue) {
        if (supportsAlpha) {
            writeRgbaColorObject(target, inValue, opt_type);
        }
        else {
            writeRgbColorObject(target, inValue, opt_type);
        }
    };
}
exports.createColorObjectWriter = createColorObjectWriter;
