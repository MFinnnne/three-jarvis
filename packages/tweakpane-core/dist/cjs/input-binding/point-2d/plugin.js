"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point2dInputPlugin = exports.getSuitableMaxValue = exports.createDimensionConstraint = void 0;
var composite_1 = require("../../common/constraint/composite");
var number_1 = require("../../common/converter/number");
var value_map_1 = require("../../common/model/value-map");
var params_parsers_1 = require("../../common/params-parsers");
var tp_error_1 = require("../../common/tp-error");
var util_1 = require("../../common/util");
var index_1 = require("../../index");
var point_nd_1 = require("../common/constraint/point-nd");
var plugin_1 = require("../number/plugin");
var point_2d_1 = require("./controller/point-2d");
var point_2d_2 = require("./converter/point-2d");
var point_2d_3 = require("./model/point-2d");
function createDimensionConstraint(params, initialValue) {
    if (!params) {
        return undefined;
    }
    var constraints = [];
    var cs = plugin_1.createStepConstraint(params, initialValue);
    if (cs) {
        constraints.push(cs);
    }
    var rs = plugin_1.createRangeConstraint(params);
    if (rs) {
        constraints.push(rs);
    }
    return new composite_1.CompositeConstraint(constraints);
}
exports.createDimensionConstraint = createDimensionConstraint;
function createConstraint(params, initialValue) {
    return new point_nd_1.PointNdConstraint({
        assembly: point_2d_3.Point2dAssembly,
        components: [createDimensionConstraint('x' in params ? params.x : undefined, initialValue.x), createDimensionConstraint('y' in params ? params.y : undefined, initialValue.y)],
    });
}
function getSuitableMaxDimensionValue(constraint, rawValue) {
    var _a = constraint ? plugin_1.findNumberRange(constraint) : [], min = _a[0], max = _a[1];
    if (!index_1.isEmpty(min) || !index_1.isEmpty(max)) {
        return Math.max(Math.abs(min !== null && min !== void 0 ? min : 0), Math.abs(max !== null && max !== void 0 ? max : 0));
    }
    var step = util_1.getBaseStep(constraint);
    return Math.max(Math.abs(step) * 10, Math.abs(rawValue) * 10);
}
/**
 * @hidden
 */
function getSuitableMaxValue(initialValue, constraint) {
    var xc = constraint instanceof point_nd_1.PointNdConstraint ? constraint.components[0] : undefined;
    var yc = constraint instanceof point_nd_1.PointNdConstraint ? constraint.components[1] : undefined;
    var xr = getSuitableMaxDimensionValue(xc, initialValue.x);
    var yr = getSuitableMaxDimensionValue(yc, initialValue.y);
    return Math.max(xr, yr);
}
exports.getSuitableMaxValue = getSuitableMaxValue;
function createAxis(initialValue, constraint) {
    return {
        baseStep: util_1.getBaseStep(constraint),
        constraint: constraint,
        textProps: value_map_1.ValueMap.fromObject({
            draggingScale: util_1.getSuitableDraggingScale(constraint, initialValue),
            formatter: number_1.createNumberFormatter(util_1.getSuitableDecimalDigits(constraint, initialValue)),
        }),
    };
}
function shouldInvertY(params) {
    if (!('y' in params)) {
        return false;
    }
    var yParams = params.y;
    if (!yParams) {
        return false;
    }
    return 'inverted' in yParams ? !!yParams.inverted : false;
}
/**
 * @hidden
 */
exports.Point2dInputPlugin = {
    id: 'input-point2d',
    type: 'input',
    accept: function (value, params) {
        if (!point_2d_3.Point2d.isObject(value)) {
            return null;
        }
        var p = params_parsers_1.ParamsParsers;
        var result = params_parsers_1.parseParams(params, {
            expanded: p.optional.boolean,
            picker: p.optional.custom(util_1.parsePickerLayout),
            x: p.optional.custom(util_1.parsePointDimensionParams),
            y: p.optional.object({
                inverted: p.optional.boolean,
                max: p.optional.number,
                min: p.optional.number,
                step: p.optional.number,
            }),
        });
        return result
            ? {
                initialValue: value,
                params: result,
            }
            : null;
    },
    binding: {
        reader: function (_args) { return point_2d_2.point2dFromUnknown; },
        constraint: function (args) { return createConstraint(args.params, args.initialValue); },
        equals: point_2d_3.Point2d.equals,
        writer: function (_args) { return point_2d_2.writePoint2d; },
    },
    controller: function (args) {
        var doc = args.document;
        var value = args.value;
        var c = args.constraint;
        if (!(c instanceof point_nd_1.PointNdConstraint)) {
            throw tp_error_1.TpError.shouldNeverHappen();
        }
        var expanded = 'expanded' in args.params ? args.params.expanded : undefined;
        var picker = 'picker' in args.params ? args.params.picker : undefined;
        return new point_2d_1.Point2dController(doc, {
            axes: [createAxis(value.rawValue.x, c.components[0]), createAxis(value.rawValue.y, c.components[1])],
            expanded: expanded !== null && expanded !== void 0 ? expanded : false,
            invertsY: shouldInvertY(args.params),
            maxValue: getSuitableMaxValue(value.rawValue, c),
            parser: number_1.parseNumber,
            pickerLayout: picker !== null && picker !== void 0 ? picker : 'popup',
            value: value,
            viewProps: args.viewProps,
        });
    },
};
