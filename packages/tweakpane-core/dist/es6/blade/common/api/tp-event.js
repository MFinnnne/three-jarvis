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
exports.TpTabSelectEvent = exports.TpFoldEvent = exports.TpUpdateEvent = exports.TpChangeEvent = exports.TpEvent = void 0;
/**
 * A base class of Tweakpane API events.
 */
var TpEvent = /** @class */ (function () {
    /**
     * @hidden
     */
    function TpEvent(target) {
        this.target = target;
    }
    return TpEvent;
}());
exports.TpEvent = TpEvent;
/**
 * An event class for value changes of input bindings.
 * @template T The type of the value.
 */
var TpChangeEvent = /** @class */ (function (_super) {
    __extends(TpChangeEvent, _super);
    /**
     * @hidden
     */
    function TpChangeEvent(target, value, presetKey, last, before) {
        var _this = _super.call(this, target) || this;
        _this.value = value;
        _this.presetKey = presetKey;
        _this.last = last !== null && last !== void 0 ? last : true;
        _this.before = before !== null && before !== void 0 ? before : true;
        return _this;
    }
    return TpChangeEvent;
}(TpEvent));
exports.TpChangeEvent = TpChangeEvent;
/**
 * An event class for value updates of monitor bindings.
 * @template T The type of the value.
 */
var TpUpdateEvent = /** @class */ (function (_super) {
    __extends(TpUpdateEvent, _super);
    /**
     * @hidden
     */
    function TpUpdateEvent(target, value, presetKey) {
        var _this = _super.call(this, target) || this;
        _this.value = value;
        _this.presetKey = presetKey;
        return _this;
    }
    return TpUpdateEvent;
}(TpEvent));
exports.TpUpdateEvent = TpUpdateEvent;
/**
 * An event class for folder.
 */
var TpFoldEvent = /** @class */ (function (_super) {
    __extends(TpFoldEvent, _super);
    /**
     * @hidden
     */
    function TpFoldEvent(target, expanded) {
        var _this = _super.call(this, target) || this;
        _this.expanded = expanded;
        return _this;
    }
    return TpFoldEvent;
}(TpEvent));
exports.TpFoldEvent = TpFoldEvent;
/**
 * An event class for tab selection.
 */
var TpTabSelectEvent = /** @class */ (function (_super) {
    __extends(TpTabSelectEvent, _super);
    /**
     * @hidden
     */
    function TpTabSelectEvent(target, index) {
        var _this = _super.call(this, target) || this;
        _this.index = index;
        return _this;
    }
    return TpTabSelectEvent;
}(TpEvent));
exports.TpTabSelectEvent = TpTabSelectEvent;
