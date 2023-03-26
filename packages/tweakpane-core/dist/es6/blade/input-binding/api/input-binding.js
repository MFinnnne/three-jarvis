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
exports.InputBindingApi = void 0;
var emitter_1 = require("../../../common/model/emitter");
var type_util_1 = require("../../../misc/type-util");
var blade_1 = require("../../common/api/blade");
var tp_event_1 = require("../../common/api/tp-event");
/**
 * The API for the input binding between the parameter and the pane.
 * @template In The internal type.
 * @template Ex The external type (= parameter object).
 */
var InputBindingApi = /** @class */ (function (_super) {
    __extends(InputBindingApi, _super);
    /**
     * @hidden
     */
    function InputBindingApi(controller) {
        var _this = _super.call(this, controller) || this;
        _this.onBindingChange_ = _this.onBindingChange_.bind(_this);
        _this.emitter_ = new emitter_1.Emitter();
        _this.controller_.binding.emitter.on('change', _this.onBindingChange_);
        return _this;
    }
    Object.defineProperty(InputBindingApi.prototype, "label", {
        get: function () {
            return this.controller_.props.get('label');
        },
        set: function (label) {
            this.controller_.props.set('label', label);
        },
        enumerable: false,
        configurable: true
    });
    InputBindingApi.prototype.on = function (eventName, handler) {
        var bh = handler.bind(this);
        this.emitter_.on(eventName, function (ev) {
            bh(ev.event);
        });
        return this;
    };
    /**
     *  set value directly
     *
     * @param rawValue raw value
     * @param emit true: emit 'change' event,false: not emit 'change' event
     */
    InputBindingApi.prototype.setValue = function (rawValue, emit) {
        if (emit === void 0) { emit = true; }
        this.controller_.binding.setValue(rawValue, emit);
    };
    InputBindingApi.prototype.refresh = function () {
        this.controller_.binding.read();
    };
    InputBindingApi.prototype.onBindingChange_ = function (ev) {
        var value = ev.sender.target.read();
        if (ev.options.emit) {
            this.emitter_.emit('change', {
                event: new tp_event_1.TpChangeEvent(this, type_util_1.forceCast(value), this.controller_.binding.target.presetKey, ev.options.last, ev.options.before)
            });
        }
    };
    return InputBindingApi;
}(blade_1.BladeApi));
exports.InputBindingApi = InputBindingApi;
