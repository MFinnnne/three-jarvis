"use strict";
exports.__esModule = true;
exports.BooleanMonitorPlugin = void 0;
var boolean_1 = require("../../common/converter/boolean");
var params_parsers_1 = require("../../common/params-parsers");
var constants_1 = require("../../misc/constants");
var multi_log_1 = require("../common/controller/multi-log");
var single_log_1 = require("../common/controller/single-log");
/**
 * @hidden
 */
exports.BooleanMonitorPlugin = {
    id: 'monitor-bool',
    type: 'monitor',
    accept: function (value, params) {
        if (typeof value !== 'boolean') {
            return null;
        }
        var p = params_parsers_1.ParamsParsers;
        var result = params_parsers_1.parseParams(params, {
            lineCount: p.optional.number
        });
        return result
            ? {
                initialValue: value,
                params: result
            }
            : null;
    },
    binding: {
        reader: function (_args) { return boolean_1.boolFromUnknown; }
    },
    controller: function (args) {
        var _a;
        if (args.value.rawValue.length === 1) {
            return new single_log_1.SingleLogController(args.document, {
                formatter: boolean_1.BooleanFormatter,
                value: args.value,
                viewProps: args.viewProps
            });
        }
        return new multi_log_1.MultiLogController(args.document, {
            formatter: boolean_1.BooleanFormatter,
            lineCount: (_a = args.params.lineCount) !== null && _a !== void 0 ? _a : constants_1.Constants.monitor.defaultLineCount,
            value: args.value,
            viewProps: args.viewProps
        });
    }
};
