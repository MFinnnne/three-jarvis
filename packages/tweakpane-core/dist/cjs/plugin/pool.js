"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginPool = void 0;
var input_binding_1 = require("../blade/input-binding/api/input-binding");
var input_binding_2 = require("../blade/input-binding/controller/input-binding");
var monitor_binding_1 = require("../blade/monitor-binding/api/monitor-binding");
var monitor_binding_2 = require("../blade/monitor-binding/controller/monitor-binding");
var plugin_1 = require("../blade/plugin");
var rack_1 = require("../blade/rack/api/rack");
var rack_2 = require("../blade/rack/controller/rack");
var tp_error_1 = require("../common/tp-error");
var plugin_2 = require("../input-binding/plugin");
var type_util_1 = require("../misc/type-util");
var plugin_3 = require("../monitor-binding/plugin");
/**
 * @hidden
 */
var PluginPool = /** @class */ (function () {
    function PluginPool() {
        this.pluginsMap_ = {
            blades: [],
            inputs: [],
            monitors: [],
        };
    }
    PluginPool.prototype.getAll = function () {
        return __spreadArray(__spreadArray(__spreadArray([], this.pluginsMap_.blades), this.pluginsMap_.inputs), this.pluginsMap_.monitors);
    };
    PluginPool.prototype.register = function (r) {
        if (r.type === 'blade') {
            this.pluginsMap_.blades.unshift(r);
        }
        else if (r.type === 'input') {
            this.pluginsMap_.inputs.unshift(r);
        }
        else if (r.type === 'monitor') {
            this.pluginsMap_.monitors.unshift(r);
        }
    };
    PluginPool.prototype.createInput = function (document, target, params) {
        var initialValue = target.read();
        if (type_util_1.isEmpty(initialValue)) {
            throw new tp_error_1.TpError({
                context: {
                    key: target.key,
                },
                type: 'nomatchingcontroller',
            });
        }
        var bc = this.pluginsMap_.inputs.reduce(function (result, plugin) {
            return result !== null && result !== void 0 ? result : plugin_2.createInputBindingController(plugin, {
                document: document,
                target: target,
                params: params,
            });
        }, null);
        if (bc) {
            return bc;
        }
        throw new tp_error_1.TpError({
            context: {
                key: target.key,
            },
            type: 'nomatchingcontroller',
        });
    };
    PluginPool.prototype.createMonitor = function (document, target, params) {
        var bc = this.pluginsMap_.monitors.reduce(function (result, plugin) {
            return result !== null && result !== void 0 ? result : plugin_3.createMonitorBindingController(plugin, {
                document: document,
                params: params,
                target: target,
            });
        }, null);
        if (bc) {
            return bc;
        }
        throw new tp_error_1.TpError({
            context: {
                key: target.key,
            },
            type: 'nomatchingcontroller',
        });
    };
    PluginPool.prototype.createBlade = function (document, params) {
        var bc = this.pluginsMap_.blades.reduce(function (result, plugin) {
            return result !== null && result !== void 0 ? result : plugin_1.createBladeController(plugin, {
                document: document,
                params: params,
            });
        }, null);
        if (!bc) {
            throw new tp_error_1.TpError({
                type: 'nomatchingview',
                context: {
                    params: params,
                },
            });
        }
        return bc;
    };
    PluginPool.prototype.createBladeApi = function (bc) {
        var _this = this;
        if (bc instanceof input_binding_2.InputBindingController) {
            return new input_binding_1.InputBindingApi(bc);
        }
        if (bc instanceof monitor_binding_2.MonitorBindingController) {
            return new monitor_binding_1.MonitorBindingApi(bc);
        }
        if (bc instanceof rack_2.RackController) {
            return new rack_1.RackApi(bc, this);
        }
        var api = this.pluginsMap_.blades.reduce(function (result, plugin) {
            return result !== null && result !== void 0 ? result : plugin.api({
                controller: bc,
                pool: _this,
            });
        }, null);
        if (!api) {
            throw tp_error_1.TpError.shouldNeverHappen();
        }
        return api;
    };
    return PluginPool;
}());
exports.PluginPool = PluginPool;
