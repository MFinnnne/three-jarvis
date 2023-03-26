"use strict";
exports.__esModule = true;
exports.NumberColorInputPlugin = void 0;
var color_1 = require("./controller/color");
var color_number_1 = require("./converter/color-number");
var color_string_1 = require("./converter/color-string");
var writer_1 = require("./converter/writer");
var color_2 = require("./model/color");
var util_1 = require("./util");
function shouldSupportAlpha(inputParams) {
    var _a;
    if ((inputParams === null || inputParams === void 0 ? void 0 : inputParams.alpha) || ((_a = inputParams === null || inputParams === void 0 ? void 0 : inputParams.color) === null || _a === void 0 ? void 0 : _a.alpha)) {
        return true;
    }
    return false;
}
function createFormatter(supportsAlpha) {
    return supportsAlpha ? function (v) { return color_string_1.colorToHexRgbaString(v, '0x'); } : function (v) { return color_string_1.colorToHexRgbString(v, '0x'); };
}
function isForColor(params) {
    if ('color' in params) {
        return true;
    }
    if ('view' in params && params.view === 'color') {
        return true;
    }
    return false;
}
/**
 * @hidden
 */
exports.NumberColorInputPlugin = {
    id: 'input-color-number',
    type: 'input',
    accept: function (value, params) {
        if (typeof value !== 'number') {
            return null;
        }
        if (!isForColor(params)) {
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
        reader: function (args) {
            return shouldSupportAlpha(args.params) ? color_number_1.colorFromRgbaNumber : color_number_1.colorFromRgbNumber;
        },
        equals: color_2.Color.equals,
        writer: function (args) {
            return writer_1.createColorNumberWriter(shouldSupportAlpha(args.params));
        }
    },
    controller: function (args) {
        var supportsAlpha = shouldSupportAlpha(args.params);
        var expanded = 'expanded' in args.params ? args.params.expanded : undefined;
        var picker = 'picker' in args.params ? args.params.picker : undefined;
        return new color_1.ColorController(args.document, {
            colorType: 'int',
            expanded: expanded !== null && expanded !== void 0 ? expanded : false,
            formatter: createFormatter(supportsAlpha),
            parser: color_string_1.createColorStringParser('int'),
            pickerLayout: picker !== null && picker !== void 0 ? picker : 'popup',
            supportsAlpha: supportsAlpha,
            value: args.value,
            viewProps: args.viewProps
        });
    }
};
