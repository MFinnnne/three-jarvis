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
exports.ViewProps = void 0;
var class_name_1 = require("../view/class-name");
var reactive_1 = require("../view/reactive");
var reactive_2 = require("./reactive");
var readonly_value_1 = require("./readonly-value");
var value_map_1 = require("./value-map");
var values_1 = require("./values");
var className = class_name_1.ClassName('');
function valueToModifier(elem, modifier) {
    return reactive_1.valueToClassName(elem, className(undefined, modifier));
}
var ViewProps = /** @class */ (function (_super) {
    __extends(ViewProps, _super);
    function ViewProps(valueMap) {
        var _a;
        var _b;
        var _this = _super.call(this, valueMap) || this;
        _this.onDisabledChange_ = _this.onDisabledChange_.bind(_this);
        _this.onParentChange_ = _this.onParentChange_.bind(_this);
        _this.onParentGlobalDisabledChange_ = _this.onParentGlobalDisabledChange_.bind(_this);
        _a = readonly_value_1.ReadonlyValue.create(values_1.createValue(_this.getGlobalDisabled_())), _this.globalDisabled_ = _a[0], _this.setGlobalDisabled_ = _a[1];
        _this.value('disabled').emitter.on('change', _this.onDisabledChange_);
        _this.value('parent').emitter.on('change', _this.onParentChange_);
        (_b = _this.get('parent')) === null || _b === void 0 ? void 0 : _b.globalDisabled.emitter.on('change', _this.onParentGlobalDisabledChange_);
        return _this;
    }
    ViewProps.create = function (opt_initialValue) {
        var _a, _b, _c;
        var initialValue = opt_initialValue !== null && opt_initialValue !== void 0 ? opt_initialValue : {};
        return new ViewProps(value_map_1.ValueMap.createCore({
            disabled: (_a = initialValue.disabled) !== null && _a !== void 0 ? _a : false,
            disposed: false,
            hidden: (_b = initialValue.hidden) !== null && _b !== void 0 ? _b : false,
            parent: (_c = initialValue.parent) !== null && _c !== void 0 ? _c : null
        }));
    };
    Object.defineProperty(ViewProps.prototype, "globalDisabled", {
        get: function () {
            return this.globalDisabled_;
        },
        enumerable: false,
        configurable: true
    });
    ViewProps.prototype.bindClassModifiers = function (elem) {
        reactive_2.bindValue(this.globalDisabled_, valueToModifier(elem, 'disabled'));
        reactive_2.bindValueMap(this, 'hidden', valueToModifier(elem, 'hidden'));
    };
    ViewProps.prototype.bindDisabled = function (target) {
        reactive_2.bindValue(this.globalDisabled_, function (disabled) {
            target.disabled = disabled;
        });
    };
    ViewProps.prototype.bindTabIndex = function (elem) {
        reactive_2.bindValue(this.globalDisabled_, function (disabled) {
            elem.tabIndex = disabled ? -1 : 0;
        });
    };
    ViewProps.prototype.handleDispose = function (callback) {
        this.value('disposed').emitter.on('change', function (disposed) {
            if (disposed) {
                callback();
            }
        });
    };
    /**
     * Gets a global disabled of the view.
     * Disabled of the view will be affected by its disabled and its parent disabled.
     */
    ViewProps.prototype.getGlobalDisabled_ = function () {
        var parent = this.get('parent');
        var parentDisabled = parent ? parent.globalDisabled.rawValue : false;
        return parentDisabled || this.get('disabled');
    };
    ViewProps.prototype.updateGlobalDisabled_ = function () {
        this.setGlobalDisabled_(this.getGlobalDisabled_());
    };
    ViewProps.prototype.onDisabledChange_ = function () {
        this.updateGlobalDisabled_();
    };
    ViewProps.prototype.onParentGlobalDisabledChange_ = function () {
        this.updateGlobalDisabled_();
    };
    ViewProps.prototype.onParentChange_ = function (ev) {
        var _a;
        var prevParent = ev.previousRawValue;
        prevParent === null || prevParent === void 0 ? void 0 : prevParent.globalDisabled.emitter.off('change', this.onParentGlobalDisabledChange_);
        (_a = this.get('parent')) === null || _a === void 0 ? void 0 : _a.globalDisabled.emitter.on('change', this.onParentGlobalDisabledChange_);
        this.updateGlobalDisabled_();
    };
    return ViewProps;
}(value_map_1.ValueMap));
exports.ViewProps = ViewProps;
