"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BindingTarget = void 0;
var tp_error_1 = require("../tp-error");
/**
 * A binding target.
 */
var BindingTarget = /** @class */ (function () {
    function BindingTarget(obj, key, opt_id) {
        this.obj_ = obj;
        this.key_ = key;
        this.presetKey_ = opt_id !== null && opt_id !== void 0 ? opt_id : key;
    }
    BindingTarget.isBindable = function (obj) {
        if (obj === null) {
            return false;
        }
        if (typeof obj !== 'object') {
            return false;
        }
        return true;
    };
    Object.defineProperty(BindingTarget.prototype, "key", {
        /**
         * The property name of the binding.
         */
        get: function () {
            return this.key_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BindingTarget.prototype, "presetKey", {
        /**
         * The key used for presets.
         */
        get: function () {
            return this.presetKey_;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Read a bound value.
     * @return A bound value
     */
    BindingTarget.prototype.read = function () {
        return this.obj_[this.key_];
    };
    /**
     * Write a value.
     * @param value The value to write to the target.
     */
    BindingTarget.prototype.write = function (value) {
        this.obj_[this.key_] = value;
    };
    /**
     * Write a value to the target property.
     * @param name The property name.
     * @param value The value to write to the target.
     */
    BindingTarget.prototype.writeProperty = function (name, value) {
        var valueObj = this.read();
        if (!BindingTarget.isBindable(valueObj)) {
            throw tp_error_1.TpError.notBindable();
        }
        if (!(name in valueObj)) {
            throw tp_error_1.TpError.propertyNotFound(name);
        }
        valueObj[name] = value;
    };
    return BindingTarget;
}());
exports.BindingTarget = BindingTarget;
