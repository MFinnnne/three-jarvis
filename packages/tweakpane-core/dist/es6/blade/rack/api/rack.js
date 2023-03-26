"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.RackApi = exports.findSubBladeApiSet = void 0;
var target_1 = require("../../../common/binding/target");
var emitter_1 = require("../../../common/model/emitter");
var tp_error_1 = require("../../../common/tp-error");
var type_util_1 = require("../../../misc/type-util");
var blade_1 = require("../../common/api/blade");
var blade_rack_1 = require("../../common/api/blade-rack");
var rack_like_api_1 = require("../../common/api/rack-like-api");
var tp_event_1 = require("../../common/api/tp-event");
var value_blade_1 = require("../../common/controller/value-blade");
var nested_ordered_set_1 = require("../../common/model/nested-ordered-set");
var input_binding_1 = require("../../input-binding/api/input-binding");
var input_binding_2 = require("../../input-binding/controller/input-binding");
var monitor_binding_1 = require("../../monitor-binding/api/monitor-binding");
var monitor_binding_2 = require("../../monitor-binding/controller/monitor-binding");
function findSubBladeApiSet(api) {
    if (api instanceof RackApi) {
        return api['apiSet_'];
    }
    if (api instanceof rack_like_api_1.RackLikeApi) {
        return api['rackApi_']['apiSet_'];
    }
    return null;
}
exports.findSubBladeApiSet = findSubBladeApiSet;
function getApiByController(apiSet, controller) {
    var api = apiSet.find(function (api) { return api.controller_ === controller; });
    /* istanbul ignore next */
    if (!api) {
        throw tp_error_1.TpError.shouldNeverHappen();
    }
    return api;
}
function createBindingTarget(obj, key, opt_id) {
    if (!target_1.BindingTarget.isBindable(obj)) {
        throw tp_error_1.TpError.notBindable();
    }
    return new target_1.BindingTarget(obj, key, opt_id);
}
var RackApi = /** @class */ (function (_super) {
    __extends(RackApi, _super);
    /**
     * @hidden
     */
    function RackApi(controller, pool) {
        var _this = _super.call(this, controller) || this;
        _this.onRackAdd_ = _this.onRackAdd_.bind(_this);
        _this.onRackRemove_ = _this.onRackRemove_.bind(_this);
        _this.onRackInputChange_ = _this.onRackInputChange_.bind(_this);
        _this.onRackMonitorUpdate_ = _this.onRackMonitorUpdate_.bind(_this);
        _this.emitter_ = new emitter_1.Emitter();
        _this.apiSet_ = new nested_ordered_set_1.NestedOrderedSet(findSubBladeApiSet);
        _this.pool_ = pool;
        var rack = _this.controller_.rack;
        rack.emitter.on('add', _this.onRackAdd_);
        rack.emitter.on('remove', _this.onRackRemove_);
        rack.emitter.on('inputchange', _this.onRackInputChange_);
        rack.emitter.on('monitorupdate', _this.onRackMonitorUpdate_);
        rack.children.forEach(function (bc) {
            _this.setUpApi_(bc);
        });
        return _this;
    }
    Object.defineProperty(RackApi.prototype, "children", {
        get: function () {
            var _this = this;
            return this.controller_.rack.children.map(function (bc) { return getApiByController(_this.apiSet_, bc); });
        },
        enumerable: false,
        configurable: true
    });
    RackApi.prototype.addInput = function (object, key, opt_params) {
        var params = opt_params !== null && opt_params !== void 0 ? opt_params : {};
        var doc = this.controller_.view.element.ownerDocument;
        var bc = this.pool_.createInput(doc, createBindingTarget(object, key, params.presetKey), params);
        var api = new input_binding_1.InputBindingApi(bc);
        return this.add(api, params.index);
    };
    RackApi.prototype.addMonitor = function (object, key, opt_params) {
        var params = opt_params !== null && opt_params !== void 0 ? opt_params : {};
        var doc = this.controller_.view.element.ownerDocument;
        var bc = this.pool_.createMonitor(doc, createBindingTarget(object, key), params);
        var api = new monitor_binding_1.MonitorBindingApi(bc);
        return type_util_1.forceCast(this.add(api, params.index));
    };
    RackApi.prototype.addFolder = function (params) {
        return blade_rack_1.addFolderAsBlade(this, params);
    };
    RackApi.prototype.addButton = function (params) {
        return blade_rack_1.addButtonAsBlade(this, params);
    };
    RackApi.prototype.addSeparator = function (opt_params) {
        return blade_rack_1.addSeparatorAsBlade(this, opt_params);
    };
    RackApi.prototype.addTab = function (params) {
        return blade_rack_1.addTabAsBlade(this, params);
    };
    RackApi.prototype.add = function (api, opt_index) {
        this.controller_.rack.add(api.controller_, opt_index);
        // Replace generated API with specified one
        var gapi = this.apiSet_.find(function (a) { return a.controller_ === api.controller_; });
        if (gapi) {
            this.apiSet_.remove(gapi);
        }
        this.apiSet_.add(api);
        return api;
    };
    RackApi.prototype.remove = function (api) {
        this.controller_.rack.remove(api.controller_);
    };
    RackApi.prototype.addBlade = function (params) {
        var doc = this.controller_.view.element.ownerDocument;
        var bc = this.pool_.createBlade(doc, params);
        var api = this.pool_.createBladeApi(bc);
        return this.add(api, params.index);
    };
    RackApi.prototype.on = function (eventName, handler) {
        var bh = handler.bind(this);
        this.emitter_.on(eventName, function (ev) {
            bh(ev.event);
        });
        return this;
    };
    RackApi.prototype.setUpApi_ = function (bc) {
        var api = this.apiSet_.find(function (api) { return api.controller_ === bc; });
        if (!api) {
            // Auto-fill missing API
            this.apiSet_.add(this.pool_.createBladeApi(bc));
        }
    };
    RackApi.prototype.onRackAdd_ = function (ev) {
        this.setUpApi_(ev.bladeController);
    };
    RackApi.prototype.onRackRemove_ = function (ev) {
        if (ev.isRoot) {
            var api = getApiByController(this.apiSet_, ev.bladeController);
            this.apiSet_.remove(api);
        }
    };
    RackApi.prototype.onRackInputChange_ = function (ev) {
        var bc = ev.bladeController;
        if (bc instanceof input_binding_2.InputBindingController) {
            var api = getApiByController(this.apiSet_, bc);
            var binding = bc.binding;
            this.emitter_.emit('change', {
                event: new tp_event_1.TpChangeEvent(api, type_util_1.forceCast(binding.target.read()), binding.target.presetKey, ev.options.last)
            });
        }
        else if (bc instanceof value_blade_1.ValueBladeController) {
            var api = getApiByController(this.apiSet_, bc);
            this.emitter_.emit('change', {
                event: new tp_event_1.TpChangeEvent(api, bc.value.rawValue, undefined, ev.options.last)
            });
        }
    };
    RackApi.prototype.onRackMonitorUpdate_ = function (ev) {
        /* istanbul ignore next */
        if (!(ev.bladeController instanceof monitor_binding_2.MonitorBindingController)) {
            throw tp_error_1.TpError.shouldNeverHappen();
        }
        var api = getApiByController(this.apiSet_, ev.bladeController);
        var binding = ev.bladeController.binding;
        this.emitter_.emit('update', {
            event: new tp_event_1.TpUpdateEvent(api, type_util_1.forceCast(binding.target.read()), binding.target.presetKey)
        });
    };
    return RackApi;
}(blade_1.BladeApi));
exports.RackApi = RackApi;
