"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInputBindingController = void 0;
var blade_1 = require("../blade/common/model/blade");
var input_binding_1 = require("../blade/input-binding/controller/input-binding");
var input_1 = require("../common/binding/input");
var value_map_1 = require("../common/model/value-map");
var values_1 = require("../common/model/values");
var view_props_1 = require("../common/model/view-props");
var params_parsers_1 = require("../common/params-parsers");
var type_util_1 = require("../misc/type-util");
function createInputBindingController(plugin, args) {
    var result = plugin.accept(args.target.read(), args.params);
    if (type_util_1.isEmpty(result)) {
        return null;
    }
    var p = params_parsers_1.ParamsParsers;
    var valueArgs = {
        target: args.target,
        initialValue: result.initialValue,
        params: result.params,
    };
    var reader = plugin.binding.reader(valueArgs);
    var constraint = plugin.binding.constraint ? plugin.binding.constraint(valueArgs) : undefined;
    var value = values_1.createValue(reader(result.initialValue), {
        constraint: constraint,
        equals: plugin.binding.equals,
    });
    var binding = new input_1.InputBinding({
        reader: reader,
        target: args.target,
        value: value,
        writer: plugin.binding.writer(valueArgs),
    });
    var disabled = p.optional.boolean(args.params.disabled).value;
    var hidden = p.optional.boolean(args.params.hidden).value;
    var controller = plugin.controller({
        constraint: constraint,
        document: args.document,
        initialValue: result.initialValue,
        params: result.params,
        value: binding.value,
        viewProps: view_props_1.ViewProps.create({
            disabled: disabled,
            hidden: hidden,
        }),
    });
    var label = p.optional.string(args.params.label).value;
    return new input_binding_1.InputBindingController(args.document, {
        binding: binding,
        blade: blade_1.createBlade(),
        props: value_map_1.ValueMap.fromObject({
            label: label !== null && label !== void 0 ? label : args.target.key,
        }),
        valueController: controller,
    });
}
exports.createInputBindingController = createInputBindingController;
