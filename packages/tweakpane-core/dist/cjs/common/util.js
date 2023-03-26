"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSuitableDraggingScale = exports.getBaseStep = exports.getSuitableDecimalDigits = exports.createListConstraint = exports.normalizeListOptions = exports.parsePointDimensionParams = exports.parsePickerLayout = exports.parseListOptions = void 0;
var type_util_1 = require("../misc/type-util");
var composite_1 = require("./constraint/composite");
var list_1 = require("./constraint/list");
var step_1 = require("./constraint/step");
var number_util_1 = require("./number-util");
var params_parsers_1 = require("./params-parsers");
function parseListOptions(value) {
    var p = params_parsers_1.ParamsParsers;
    if (Array.isArray(value)) {
        return p.required.array(p.required.object({
            text: p.required.string,
            value: p.required.raw,
        }))(value).value;
    }
    if (typeof value === 'object') {
        return p.required.raw(value).value;
    }
    return undefined;
}
exports.parseListOptions = parseListOptions;
function parsePickerLayout(value) {
    if (value === 'inline' || value === 'popup') {
        return value;
    }
    return undefined;
}
exports.parsePickerLayout = parsePickerLayout;
function parsePointDimensionParams(value) {
    var p = params_parsers_1.ParamsParsers;
    return p.required.object({
        max: p.optional.number,
        min: p.optional.number,
        step: p.optional.number,
    })(value).value;
}
exports.parsePointDimensionParams = parsePointDimensionParams;
function normalizeListOptions(options) {
    if (Array.isArray(options)) {
        return options;
    }
    var items = [];
    Object.keys(options).forEach(function (text) {
        items.push({ text: text, value: options[text] });
    });
    return items;
}
exports.normalizeListOptions = normalizeListOptions;
/**
 * Tries to create a list constraint.
 * @template T The type of the raw value.
 * @param options The list options.
 * @return A constraint or null if not found.
 */
function createListConstraint(options) {
    return !type_util_1.isEmpty(options) ? new list_1.ListConstraint(normalizeListOptions(type_util_1.forceCast(options))) : null;
}
exports.createListConstraint = createListConstraint;
function findStep(constraint) {
    var c = constraint ? composite_1.findConstraint(constraint, step_1.StepConstraint) : null;
    if (!c) {
        return null;
    }
    return c.step;
}
/**
 * @hidden
 */
function getSuitableDecimalDigits(constraint, rawValue) {
    var sc = constraint && composite_1.findConstraint(constraint, step_1.StepConstraint);
    if (sc) {
        return number_util_1.getDecimalDigits(sc.step);
    }
    return Math.max(number_util_1.getDecimalDigits(rawValue), 2);
}
exports.getSuitableDecimalDigits = getSuitableDecimalDigits;
/**
 * @hidden
 */
function getBaseStep(constraint) {
    var step = findStep(constraint);
    return step !== null && step !== void 0 ? step : 1;
}
exports.getBaseStep = getBaseStep;
/**
 * @hidden
 */
function getSuitableDraggingScale(constraint, rawValue) {
    var _a;
    var sc = constraint && composite_1.findConstraint(constraint, step_1.StepConstraint);
    var base = Math.abs((_a = sc === null || sc === void 0 ? void 0 : sc.step) !== null && _a !== void 0 ? _a : rawValue);
    return base === 0 ? 0.1 : Math.pow(10, Math.floor(Math.log10(base)) - 1);
}
exports.getSuitableDraggingScale = getSuitableDraggingScale;
