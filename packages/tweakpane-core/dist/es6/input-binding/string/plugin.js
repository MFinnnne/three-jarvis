"use strict";
exports.__esModule = true;
exports.StringInputPlugin = void 0;
var composite_1 = require("../../common/constraint/composite");
var list_1 = require("../../common/constraint/list");
var list_2 = require("../../common/controller/list");
var text_1 = require("../../common/controller/text");
var string_1 = require("../../common/converter/string");
var value_map_1 = require("../../common/model/value-map");
var params_parsers_1 = require("../../common/params-parsers");
var primitive_1 = require("../../common/primitive");
var util_1 = require("../../common/util");
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
exports.StringInputPlugin = {
    id: 'input-string',
    type: 'input',
    accept: function (value, params) {
        if (typeof value !== 'string') {
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
        reader: function (_args) { return string_1.stringFromUnknown; },
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
        return new text_1.TextController(doc, {
            parser: function (v) { return v; },
            props: value_map_1.ValueMap.fromObject({
                formatter: string_1.formatString
            }),
            value: value,
            viewProps: args.viewProps
        });
    }
};
