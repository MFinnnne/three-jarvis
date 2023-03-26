"use strict";
exports.__esModule = true;
exports.StringMonitorPlugin = void 0;
var string_1 = require("../../common/converter/string");
var params_parsers_1 = require("../../common/params-parsers");
var constants_1 = require("../../misc/constants");
var multi_log_1 = require("../common/controller/multi-log");
var single_log_1 = require("../common/controller/single-log");
/**
 * @hidden
 */
exports.StringMonitorPlugin = {
    id: 'monitor-string',
    type: 'monitor',
    accept: function (value, params) {
        if (typeof value !== 'string') {
            return null;
        }
        var p = params_parsers_1.ParamsParsers;
        var result = params_parsers_1.parseParams(params, {
            lineCount: p.optional.number,
            multiline: p.optional.boolean
        });
        return result
            ? {
                initialValue: value,
                params: result
            }
            : null;
    },
    binding: {
        reader: function (_args) { return string_1.stringFromUnknown; }
    },
    controller: function (args) {
        var _a;
        var value = args.value;
        var multiline = value.rawValue.length > 1 || ('multiline' in args.params && args.params.multiline);
        if (multiline) {
            return new multi_log_1.MultiLogController(args.document, {
                formatter: string_1.formatString,
                lineCount: (_a = args.params.lineCount) !== null && _a !== void 0 ? _a : constants_1.Constants.monitor.defaultLineCount,
                value: value,
                viewProps: args.viewProps
            });
        }
        return new single_log_1.SingleLogController(args.document, {
            formatter: string_1.formatString,
            value: value,
            viewProps: args.viewProps
        });
    }
};
