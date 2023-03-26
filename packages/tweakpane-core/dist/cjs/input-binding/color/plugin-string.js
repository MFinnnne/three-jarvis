"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringColorInputPlugin = void 0;
var tp_error_1 = require("../../common/tp-error");
var color_1 = require("./controller/color");
var color_string_1 = require("./converter/color-string");
var writer_1 = require("./converter/writer");
var color_2 = require("./model/color");
var util_1 = require("./util");
/**
 * @hidden
 */
exports.StringColorInputPlugin = {
    id: 'input-color-string',
    type: 'input',
    accept: function (value, params) {
        if (typeof value !== 'string') {
            return null;
        }
        if ('view' in params && params.view === 'text') {
            return null;
        }
        var format = color_string_1.detectStringColorFormat(value, util_1.extractColorType(params));
        if (!format) {
            return null;
        }
        var stringifier = color_string_1.findColorStringifier(format);
        if (!stringifier) {
            return null;
        }
        var result = util_1.parseColorInputParams(params);
        return result
            ? {
                initialValue: value,
                params: result,
            }
            : null;
    },
    binding: {
        reader: function (args) { var _a; return color_string_1.createColorStringBindingReader((_a = util_1.extractColorType(args.params)) !== null && _a !== void 0 ? _a : 'int'); },
        equals: color_2.Color.equals,
        writer: function (args) {
            var format = color_string_1.detectStringColorFormat(args.initialValue, util_1.extractColorType(args.params));
            if (!format) {
                throw tp_error_1.TpError.shouldNeverHappen();
            }
            var writer = writer_1.createColorStringWriter(format);
            if (!writer) {
                throw tp_error_1.TpError.notBindable();
            }
            return writer;
        },
    },
    controller: function (args) {
        var format = color_string_1.detectStringColorFormat(args.initialValue, util_1.extractColorType(args.params));
        if (!format) {
            throw tp_error_1.TpError.shouldNeverHappen();
        }
        var stringifier = color_string_1.findColorStringifier(format);
        if (!stringifier) {
            throw tp_error_1.TpError.shouldNeverHappen();
        }
        var expanded = 'expanded' in args.params ? args.params.expanded : undefined;
        var picker = 'picker' in args.params ? args.params.picker : undefined;
        return new color_1.ColorController(args.document, {
            colorType: format.type,
            expanded: expanded !== null && expanded !== void 0 ? expanded : false,
            formatter: stringifier,
            parser: color_string_1.createColorStringParser(format.type),
            pickerLayout: picker !== null && picker !== void 0 ? picker : 'popup',
            supportsAlpha: format.alpha,
            value: args.value,
            viewProps: args.viewProps,
        });
    },
};
