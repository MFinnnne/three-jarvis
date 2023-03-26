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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorBindingApi = void 0;
var emitter_1 = require("../../../common/model/emitter");
var type_util_1 = require("../../../misc/type-util");
var blade_1 = require("../../common/api/blade");
var tp_event_1 = require("../../common/api/tp-event");
/**
 * The API for the monitor binding between the parameter and the pane.
 */
var MonitorBindingApi = /** @class */ (function (_super) {
    __extends(MonitorBindingApi, _super);
    /**
     * @hidden
     */
    function MonitorBindingApi(controller) {
        var _this = _super.call(this, controller) || this;
        _this.onBindingUpdate_ = _this.onBindingUpdate_.bind(_this);
        _this.emitter_ = new emitter_1.Emitter();
        _this.controller_.binding.emitter.on('update', _this.onBindingUpdate_);
        return _this;
    }
    Object.defineProperty(MonitorBindingApi.prototype, "label", {
        get: function () {
            return this.controller_.props.get('label');
        },
        set: function (label) {
            this.controller_.props.set('label', label);
        },
        enumerable: false,
        configurable: true
    });
    MonitorBindingApi.prototype.on = function (eventName, handler) {
        var bh = handler.bind(this);
        this.emitter_.on(eventName, function (ev) {
            bh(ev.event);
        });
        return this;
    };
    MonitorBindingApi.prototype.refresh = function () {
        this.controller_.binding.read();
    };
    MonitorBindingApi.prototype.onBindingUpdate_ = function (ev) {
        var value = ev.sender.target.read();
        this.emitter_.emit('update', {
            event: new tp_event_1.TpUpdateEvent(this, type_util_1.forceCast(value), this.controller_.binding.target.presetKey),
        });
    };
    return MonitorBindingApi;
}(blade_1.BladeApi));
exports.MonitorBindingApi = MonitorBindingApi;
