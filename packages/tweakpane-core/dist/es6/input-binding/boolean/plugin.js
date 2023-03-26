"use strict";
exports.__esModule = true;
exports.BooleanInputPlugin = void 0;
var composite_1 = require("../../common/constraint/composite");
var list_1 = require("../../common/constraint/list");
var list_2 = require("../../common/controller/list");
var boolean_1 = require("../../common/converter/boolean");
var value_map_1 = require("../../common/model/value-map");
var params_parsers_1 = require("../../common/params-parsers");
var primitive_1 = require("../../common/primitive");
var util_1 = require("../../common/util");
var checkbox_1 = require("./controller/checkbox");
function createConstraint(params) {
    var constraints = [];
    var lc = util_1.createListConstraint(params.options);
    if (lc) {
        constraints.push(lc);
    }
    return new composite_1.CompositeConstraint(constraints);
}
/**
 * @hidden
 */
exports.BooleanInputPlugin = {
    id: 'input-bool',
    type: 'input',
    accept: function (value, params) {
        if (typeof value !== 'boolean') {
            return null;
        }
        var p = params_parsers_1.ParamsParsers;
        var result = params_parsers_1.parseParams(params, {
            options: p.optional.custom(util_1.parseListOptions)
        });
        return result
            ? {
                initialValue: value,
                params: result
            }
            : null;
    },
    binding: {
        reader: function (_args) { return boolean_1.boolFromUnknown; },
        constraint: function (args) { return createConstraint(args.params); },
        writer: function (_args) { return primitive_1.writePrimitive; }
    },
    controller: function (args) {
        var doc = args.document;
        var value = args.value;
        var c = args.constraint;
        var lc = c && composite_1.findConstraint(c, list_1.ListConstraint);
        if (lc) {
            return new list_2.ListController(doc, {
                props: new value_map_1.ValueMap({
                    options: lc.values.value('options')
                }),
                value: value,
                viewProps: args.viewProps
            });
        }
        return new checkbox_1.CheckboxController(doc, {
            value: value,
            viewProps: args.viewProps
        });
    }
};
