"use strict";
exports.__esModule = true;
exports.ObjectColorInputPlugin = void 0;
var color_1 = require("./controller/color");
var color_number_1 = require("./converter/color-number");
var color_string_1 = require("./converter/color-string");
var writer_1 = require("./converter/writer");
var color_2 = require("./model/color");
var util_1 = require("./util");
function shouldSupportAlpha(initialValue) {
    return color_2.Color.isRgbaColorObject(initialValue);
}
function createColorObjectReader(opt_type) {
    return function (value) {
        return color_number_1.colorFromObject(value, opt_type);
    };
}
function createColorObjectFormatter(supportsAlpha, type) {
    return function (value) {
        if (supportsAlpha) {
            return color_string_1.colorToObjectRgbaString(value, type);
        }
        return color_string_1.colorToObjectRgbString(value, type);
    };
}
/**
 * @hidden
 */
exports.ObjectColorInputPlugin = {
    id: 'input-color-object',
    type: 'input',
    accept: function (value, params) {
        if (!color_2.Color.isColorObject(value)) {
            return null;
        }
        var result = util_1.parseColorInputParams(params);
        return result
            ? {
                initialValue: value,
                params: result
            }
            : null;
    },
    binding: {
        reader: function (args) { return createColorObjectReader(util_1.extractColorType(args.params)); },
        equals: color_2.Color.equals,
        writer: function (args) { return writer_1.createColorObjectWriter(shouldSupportAlpha(args.initialValue), util_1.extractColorType(args.params)); }
    },
    controller: function (args) {
        var _a;
        var supportsAlpha = color_2.Color.isRgbaColorObject(args.initialValue);
        var expanded = 'expanded' in args.params ? args.params.expanded : undefined;
        var picker = 'picker' in args.params ? args.params.picker : undefined;
        var type = (_a = util_1.extractColorType(args.params)) !== null && _a !== void 0 ? _a : 'int';
        return new color_1.ColorController(args.document, {
            colorType: type,
            expanded: expanded !== null && expanded !== void 0 ? expanded : false,
            formatter: createColorObjectFormatter(supportsAlpha, type),
            parser: color_string_1.createColorStringParser(type),
            pickerLayout: picker !== null && picker !== void 0 ? picker : 'popup',
            supportsAlpha: supportsAlpha,
            value: args.value,
            viewProps: args.viewProps
        });
    }
};
