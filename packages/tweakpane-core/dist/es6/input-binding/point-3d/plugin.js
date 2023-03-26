"use strict";
exports.__esModule = true;
exports.Point3dInputPlugin = void 0;
var number_1 = require("../../common/converter/number");
var value_map_1 = require("../../common/model/value-map");
var params_parsers_1 = require("../../common/params-parsers");
var tp_error_1 = require("../../common/tp-error");
var util_1 = require("../../common/util");
var point_nd_1 = require("../common/constraint/point-nd");
var point_nd_text_1 = require("../common/controller/point-nd-text");
var plugin_1 = require("../point-2d/plugin");
var point_3d_1 = require("./converter/point-3d");
var point_3d_2 = require("./model/point-3d");
function createConstraint(params, initialValue) {
    return new point_nd_1.PointNdConstraint({
        assembly: point_3d_2.Point3dAssembly,
        components: [
            plugin_1.createDimensionConstraint('x' in params ? params.x : undefined, initialValue.x),
            plugin_1.createDimensionConstraint('y' in params ? params.y : undefined, initialValue.y),
            plugin_1.createDimensionConstraint('z' in params ? params.z : undefined, initialValue.z),
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
exports.Point3dInputPlugin = {
    id: 'input-point3d',
    type: 'input',
    accept: function (value, params) {
        if (!point_3d_2.Point3d.isObject(value)) {
            return null;
        }
        var p = params_parsers_1.ParamsParsers;
        var result = params_parsers_1.parseParams(params, {
            x: p.optional.custom(util_1.parsePointDimensionParams),
            y: p.optional.custom(util_1.parsePointDimensionParams),
            z: p.optional.custom(util_1.parsePointDimensionParams)
        });
        return result
            ? {
                initialValue: value,
                params: result
            }
            : null;
    },
    binding: {
        reader: function (_args) { return point_3d_1.point3dFromUnknown; },
        constraint: function (args) { return createConstraint(args.params, args.initialValue); },
        equals: point_3d_2.Point3d.equals,
        writer: function (_args) { return point_3d_1.writePoint3d; }
    },
    controller: function (args) {
        var value = args.value;
        var c = args.constraint;
        if (!(c instanceof point_nd_1.PointNdConstraint)) {
            throw tp_error_1.TpError.shouldNeverHappen();
        }
        return new point_nd_text_1.PointNdTextController(args.document, {
            assembly: point_3d_2.Point3dAssembly,
            axes: [createAxis(value.rawValue.x, c.components[0]), createAxis(value.rawValue.y, c.components[1]), createAxis(value.rawValue.z, c.components[2])],
            parser: number_1.parseNumber,
            value: value,
            viewProps: args.viewProps
        });
    }
};
