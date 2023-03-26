"use strict";
exports.__esModule = true;
exports.Point4dInputPlugin = void 0;
var number_1 = require("../../common/converter/number");
var value_map_1 = require("../../common/model/value-map");
var params_parsers_1 = require("../../common/params-parsers");
var tp_error_1 = require("../../common/tp-error");
var util_1 = require("../../common/util");
var point_nd_1 = require("../common/constraint/point-nd");
var point_nd_text_1 = require("../common/controller/point-nd-text");
var plugin_1 = require("../point-2d/plugin");
var point_4d_1 = require("./converter/point-4d");
var point_4d_2 = require("./model/point-4d");
function createConstraint(params, initialValue) {
    return new point_nd_1.PointNdConstraint({
        assembly: point_4d_2.Point4dAssembly,
        components: [
            plugin_1.createDimensionConstraint('x' in params ? params.x : undefined, initialValue.x),
            plugin_1.createDimensionConstraint('y' in params ? params.y : undefined, initialValue.y),
            plugin_1.createDimensionConstraint('z' in params ? params.z : undefined, initialValue.z),
            plugin_1.createDimensionConstraint('w' in params ? params.w : undefined, initialValue.w),
        ]
    });
}
function createAxis(initialValue, constraint) {
    return {
        baseStep: util_1.getBaseStep(constraint),
        constraint: constraint,
        textProps: value_map_1.ValueMap.fromObject({
            draggingScale: util_1.getSuitableDraggingScale(constraint, initialValue),
            formatter: number_1.createNumberFormatter(util_1.getSuitableDecimalDigits(constraint, initialValue))
        })
    };
}
/**
 * @hidden
 */
exports.Point4dInputPlugin = {
    id: 'input-point4d',
    type: 'input',
    accept: function (value, params) {
        if (!point_4d_2.Point4d.isObject(value)) {
            return null;
        }
        var p = params_parsers_1.ParamsParsers;
        var result = params_parsers_1.parseParams(params, {
            x: p.optional.custom(util_1.parsePointDimensionParams),
            y: p.optional.custom(util_1.parsePointDimensionParams),
            z: p.optional.custom(util_1.parsePointDimensionParams),
            w: p.optional.custom(util_1.parsePointDimensionParams)
        });
        return result
            ? {
                initialValue: value,
                params: result
            }
            : null;
    },
    binding: {
        reader: function (_args) { return point_4d_1.point4dFromUnknown; },
        constraint: function (args) { return createConstraint(args.params, args.initialValue); },
        equals: point_4d_2.Point4d.equals,
        writer: function (_args) { return point_4d_1.writePoint4d; }
    },
    controller: function (args) {
        var value = args.value;
        var c = args.constraint;
        if (!(c instanceof point_nd_1.PointNdConstraint)) {
            throw tp_error_1.TpError.shouldNeverHappen();
        }
        return new point_nd_text_1.PointNdTextController(args.document, {
            assembly: point_4d_2.Point4dAssembly,
            axes: value.rawValue.getComponents().map(function (comp, index) { return createAxis(comp, c.components[index]); }),
            parser: number_1.parseNumber,
            value: value,
            viewProps: args.viewProps
        });
    }
};
