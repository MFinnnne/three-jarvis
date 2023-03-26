"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBladeController = void 0;
var view_props_1 = require("../common/model/view-props");
var params_parsers_1 = require("../common/params-parsers");
var type_util_1 = require("../misc/type-util");
var blade_1 = require("./common/model/blade");
function createBladeController(plugin, args) {
    var ac = plugin.accept(args.params);
    if (!ac) {
        return null;
    }
    var disabled = params_parsers_1.ParamsParsers.optional.boolean(args.params['disabled']).value;
    var hidden = params_parsers_1.ParamsParsers.optional.boolean(args.params['hidden']).value;
    return plugin.controller({
        blade: blade_1.createBlade(),
        document: args.document,
        params: type_util_1.forceCast(__assign(__assign({}, ac.params), { disabled: disabled, hidden: hidden })),
        viewProps: view_props_1.ViewProps.create({
            disabled: disabled,
            hidden: hidden,
        }),
    });
}
exports.createBladeController = createBladeController;
