"use strict";
exports.__esModule = true;
exports.extractColorType = exports.getBaseStepForColor = exports.parseColorInputParams = void 0;
var params_parsers_1 = require("../../common/params-parsers");
var util_1 = require("../../common/util");
function parseColorType(value) {
    return value === 'int' ? 'int' : value === 'float' ? 'float' : undefined;
}
function parseColorInputParams(params) {
    var p = params_parsers_1.ParamsParsers;
    return params_parsers_1.parseParams(params, {
        alpha: p.optional.boolean,
        color: p.optional.object({
            alpha: p.optional.boolean,
            type: p.optional.custom(parseColorType)
        }),
        expanded: p.optional.boolean,
        picker: p.optional.custom(util_1.parsePickerLayout)
    });
}
exports.parseColorInputParams = parseColorInputParams;
/**
 * @hidden
 */
function getBaseStepForColor(forAlpha) {
    return forAlpha ? 0.1 : 1;
}
exports.getBaseStepForColor = getBaseStepForColor;
/**
 * @hidden
 */
function extractColorType(params) {
    var _a;
    return (_a = params.color) === null || _a === void 0 ? void 0 : _a.type;
}
exports.extractColorType = extractColorType;
