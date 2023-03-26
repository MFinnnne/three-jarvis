"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberInputPlugin = exports.findNumberRange = exports.createRangeConstraint = exports.createStepConstraint = void 0;
var composite_1 = require("../../common/constraint/composite");
var definite_range_1 = require("../../common/constraint/definite-range");
var list_1 = require("../../common/constraint/list");
var range_1 = require("../../common/constraint/range");
var step_1 = require("../../common/constraint/step");
var list_2 = require("../../common/controller/list");
var number_1 = require("../../common/converter/number");
var value_map_1 = require("../../common/model/value-map");
var number_text_1 = require("../../common/number/controller/number-text");
var slider_text_1 = require("../../common/number/controller/slider-text");
var params_parsers_1 = require("../../common/params-parsers");
var primitive_1 = require("../../common/primitive");
var util_1 = require("../../common/util");
var type_util_1 = require("../../misc/type-util");
/**
 * Tries to create a step constraint.
 * @param params The input parameters object.
 * @return A constraint or null if not found.
 */
function createStepConstraint(params, initialValue) {
    if ('step' in params && !type_util_1.isEmpty(params.step)) {
        return new step_1.StepConstraint(params.step, initialValue);
    }
    return null;
}
exports.createStepConstraint = createStepConstraint;
/**
 * Tries to create a range constraint.
 * @param params The input parameters object.
 * @return A constraint or null if not found.
 */
function createRangeConstraint(params) {
    if (!type_util_1.isEmpty(params.max) && !type_util_1.isEmpty(params.min)) {
        return new definite_range_1.DefiniteRangeConstraint({
            max: params.max,
            min: params.min,
        });
    }
    if (!type_util_1.isEmpty(params.max) || !type_util_1.isEmpty(params.min)) {
        return new range_1.RangeConstraint({
            max: params.max,
            min: params.min,
        });
    }
    return null;
}
exports.createRangeConstraint = createRangeConstraint;
/**
 * Finds a range from number constraint.
 * @param c The number constraint.
 * @return A list that contains a minimum value and a max value.
 */
function findNumberRange(c) {
    var drc = composite_1.findConstraint(c, definite_range_1.DefiniteRangeConstraint);
    if (drc) {
        return [drc.values.get('min'), drc.values.get('max')];
    }
    var rc = composite_1.findConstraint(c, range_1.RangeConstraint);
    if (rc) {
        return [rc.minValue, rc.maxValue];
    }
    return [undefined, undefined];
}
exports.findNumberRange = findNumberRange;
function createConstraint(params, 
// TODO: Make it required in the next version
initialValue) {
    var constraints = [];
    var sc = createStepConstraint(params, initialValue);
    if (sc) {
        constraints.push(sc);
    }
    var rc = createRangeConstraint(params);
    if (rc) {
        constraints.push(rc);
    }
    var lc = util_1.createListConstraint(params.options);
    if (lc) {
        constraints.push(lc);
    }
    return new composite_1.CompositeConstraint(constraints);
}
/**
 * @hidden
 */
exports.NumberInputPlugin = {
    id: 'input-number',
    type: 'input',
    accept: function (value, params) {
        if (typeof value !== 'number') {
            return null;
        }
        var p = params_parsers_1.ParamsParsers;
        var result = params_parsers_1.parseParams(params, {
            format: p.optional.function,
            max: p.optional.number,
            min: p.optional.number,
            options: p.optional.custom(util_1.parseListOptions),
            step: p.optional.number,
        });
        return result
            ? {
                initialValue: value,
                params: result,
            }
            : null;
    },
    binding: {
        reader: function (_args) { return number_1.numberFromUnknown; },
        constraint: function (args) { return createConstraint(args.params, args.initialValue); },
        writer: function (_args) { return primitive_1.writePrimitive; },
    },
    controller: function (args) {
        var _a;
        var value = args.value;
        var c = args.constraint;
        var lc = c && composite_1.findConstraint(c, list_1.ListConstraint);
        if (lc) {
            return new list_2.ListController(args.document, {
                props: new value_map_1.ValueMap({
                    options: lc.values.value('options'),
                }),
                value: value,
                viewProps: args.viewProps,
            });
        }
        var formatter = (_a = ('format' in args.params ? args.params.format : undefined)) !== null && _a !== void 0 ? _a : number_1.createNumberFormatter(util_1.getSuitableDecimalDigits(c, value.rawValue));
        var drc = c && composite_1.findConstraint(c, definite_range_1.DefiniteRangeConstraint);
        if (drc) {
            return new slider_text_1.SliderTextController(args.document, {
                baseStep: util_1.getBaseStep(c),
                parser: number_1.parseNumber,
                sliderProps: new value_map_1.ValueMap({
                    maxValue: drc.values.value('max'),
                    minValue: drc.values.value('min'),
                }),
                textProps: value_map_1.ValueMap.fromObject({
                    draggingScale: util_1.getSuitableDraggingScale(c, value.rawValue),
                    formatter: formatter,
                }),
                value: value,
                viewProps: args.viewProps,
            });
        }
        return new number_text_1.NumberTextController(args.document, {
            baseStep: util_1.getBaseStep(c),
            parser: number_1.parseNumber,
            props: value_map_1.ValueMap.fromObject({
                draggingScale: util_1.getSuitableDraggingScale(c, value.rawValue),
                formatter: formatter,
            }),
            value: value,
            viewProps: args.viewProps,
        });
    },
};
