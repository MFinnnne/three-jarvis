"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeparatorBladePlugin = void 0;
var params_parsers_1 = require("../../common/params-parsers");
var separator_1 = require("./api/separator");
var separator_2 = require("./controller/separator");
exports.SeparatorBladePlugin = {
    id: 'separator',
    type: 'blade',
    accept: function (params) {
        var p = params_parsers_1.ParamsParsers;
        var result = params_parsers_1.parseParams(params, {
            view: p.required.constant('separator'),
        });
        return result ? { params: result } : null;
    },
    controller: function (args) {
        return new separator_2.SeparatorController(args.document, {
            blade: args.blade,
            viewProps: args.viewProps,
        });
    },
    api: function (args) {
        if (!(args.controller instanceof separator_2.SeparatorController)) {
            return null;
        }
        return new separator_1.SeparatorApi(args.controller);
    },
};
