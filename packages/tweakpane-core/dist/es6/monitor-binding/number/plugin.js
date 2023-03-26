"use strict";
exports.__esModule = true;
exports.NumberMonitorPlugin = void 0;
var number_1 = require("../../common/converter/number");
var value_map_1 = require("../../common/model/value-map");
var params_parsers_1 = require("../../common/params-parsers");
var constants_1 = require("../../misc/constants");
var type_util_1 = require("../../misc/type-util");
var multi_log_1 = require("../common/controller/multi-log");
var single_log_1 = require("../common/controller/single-log");
var graph_log_1 = require("./controller/graph-log");
function createFormatter(params) {
    return 'format' in params && !type_util_1.isEmpty(params.format) ? params.format : number_1.createNumberFormatter(2);
}
function createTextMonitor(args) {
    var _a;
    if (args.value.rawValue.length === 1) {
        return new single_log_1.SingleLogController(args.document, {
            formatter: createFormatter(args.params),
            value: args.value,
            viewProps: args.viewProps
        });
    }
    return new multi_log_1.MultiLogController(args.document, {
        formatter: createFormatter(args.params),
        lineCount: (_a = args.params.lineCount) !== null && _a !== void 0 ? _a : constants_1.Constants.monitor.defaultLineCount,
        value: args.value,
        viewProps: args.viewProps
    });
}
function createGraphMonitor(args) {
    var _a, _b, _c;
    return new graph_log_1.GraphLogController(args.document, {
        formatter: createFormatter(args.params),
        lineCount: (_a = args.params.lineCount) !== null && _a !== void 0 ? _a : constants_1.Constants.monitor.defaultLineCount,
        props: value_map_1.ValueMap.fromObject({
            maxValue: (_b = ('max' in args.params ? args.params.max : null)) !== null && _b !== void 0 ? _b : 100,
            minValue: (_c = ('min' in args.params ? args.params.min : null)) !== null && _c !== void 0 ? _c : 0
        }),
        value: args.value,
        viewProps: args.viewProps
    });
}
function shouldShowGraph(params) {
    return 'view' in params && params.view === 'graph';
}
/**
 * @hidden
 */
exports.NumberMonitorPlugin = {
    id: 'monitor-number',
    type: 'monitor',
    accept: function (value, params) {
        if (typeof value !== 'number') {
            return null;
        }
        var p = params_parsers_1.ParamsParsers;
        var result = params_parsers_1.parseParams(params, {
            format: p.optional["function"],
            lineCount: p.optional.number,
            max: p.optional.number,
            min: p.optional.number,
            view: p.optional.string
        });
        return result
            ? {
                initialValue: value,
                params: result
            }
            : null;
    },
    binding: {
        defaultBufferSize: function (params) { return (shouldShowGraph(params) ? 64 : 1); },
        reader: function (_args) { return number_1.numberFromUnknown; }
    },
    controller: function (args) {
        if (shouldShowGraph(args.params)) {
            return createGraphMonitor(args);
        }
        return createTextMonitor(args);
    }
};
