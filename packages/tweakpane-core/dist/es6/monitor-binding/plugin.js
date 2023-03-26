"use strict";
exports.__esModule = true;
exports.createMonitorBindingController = void 0;
var blade_1 = require("../blade/common/model/blade");
var monitor_binding_1 = require("../blade/monitor-binding/controller/monitor-binding");
var monitor_1 = require("../common/binding/monitor");
var interval_1 = require("../common/binding/ticker/interval");
var manual_1 = require("../common/binding/ticker/manual");
var buffered_value_1 = require("../common/model/buffered-value");
var value_map_1 = require("../common/model/value-map");
var view_props_1 = require("../common/model/view-props");
var params_parsers_1 = require("../common/params-parsers");
var constants_1 = require("../misc/constants");
var type_util_1 = require("../misc/type-util");
function createTicker(document, interval) {
    return interval === 0 ? new manual_1.ManualTicker() : new interval_1.IntervalTicker(document, interval !== null && interval !== void 0 ? interval : constants_1.Constants.monitor.defaultInterval);
}
function createMonitorBindingController(plugin, args) {
    var _a, _b, _c;
    var P = params_parsers_1.ParamsParsers;
    var result = plugin.accept(args.target.read(), args.params);
    if (type_util_1.isEmpty(result)) {
        return null;
    }
    var bindingArgs = {
        target: args.target,
        initialValue: result.initialValue,
        params: result.params
    };
    var reader = plugin.binding.reader(bindingArgs);
    var bufferSize = (_b = (_a = P.optional.number(args.params.bufferSize).value) !== null && _a !== void 0 ? _a : (plugin.binding.defaultBufferSize && plugin.binding.defaultBufferSize(result.params))) !== null && _b !== void 0 ? _b : 1;
    var interval = P.optional.number(args.params.interval).value;
    var binding = new monitor_1.MonitorBinding({
        reader: reader,
        target: args.target,
        ticker: createTicker(args.document, interval),
        value: buffered_value_1.initializeBuffer(bufferSize)
    });
    var disabled = P.optional.boolean(args.params.disabled).value;
    var hidden = P.optional.boolean(args.params.hidden).value;
    var controller = plugin.controller({
        document: args.document,
        params: result.params,
        value: binding.value,
        viewProps: view_props_1.ViewProps.create({
            disabled: disabled,
            hidden: hidden
        })
    });
    var label = (_c = P.optional.string(args.params.label).value) !== null && _c !== void 0 ? _c : args.target.key;
    return new monitor_binding_1.MonitorBindingController(args.document, {
        binding: binding,
        blade: blade_1.createBlade(),
        props: value_map_1.ValueMap.fromObject({
            label: label
        }),
        valueController: controller
    });
}
exports.createMonitorBindingController = createMonitorBindingController;
