"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TpError = void 0;
var type_util_1 = require("../misc/type-util");
var CREATE_MESSAGE_MAP = {
    alreadydisposed: function () { return 'View has been already disposed'; },
    invalidparams: function (context) { return "Invalid parameters for '" + context.name + "'"; },
    nomatchingcontroller: function (context) { return "No matching controller for '" + context.key + "'"; },
    nomatchingview: function (context) { return "No matching view for '" + JSON.stringify(context.params) + "'"; },
    notbindable: function () { return "Value is not bindable"; },
    propertynotfound: function (context) { return "Property '" + context.name + "' not found"; },
    shouldneverhappen: function () { return 'This error should never happen'; },
};
var TpError = /** @class */ (function () {
    function TpError(config) {
        var _a;
        this.message = (_a = CREATE_MESSAGE_MAP[config.type](type_util_1.forceCast(config.context))) !== null && _a !== void 0 ? _a : 'Unexpected error';
        this.name = this.constructor.name;
        this.stack = new Error(this.message).stack;
        this.type = config.type;
    }
    TpError.alreadyDisposed = function () {
        return new TpError({ type: 'alreadydisposed' });
    };
    TpError.notBindable = function () {
        return new TpError({
            type: 'notbindable',
        });
    };
    TpError.propertyNotFound = function (name) {
        return new TpError({
            type: 'propertynotfound',
            context: {
                name: name,
            },
        });
    };
    TpError.shouldNeverHappen = function () {
        return new TpError({ type: 'shouldneverhappen' });
    };
    return TpError;
}());
exports.TpError = TpError;
