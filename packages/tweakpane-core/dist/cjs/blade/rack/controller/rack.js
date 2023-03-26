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
exports.RackController = void 0;
var dom_util_1 = require("../../../common/dom-util");
var plain_1 = require("../../../common/view/plain");
var blade_1 = require("../../common/controller/blade");
var blade_rack_1 = require("../../common/model/blade-rack");
var RackController = /** @class */ (function (_super) {
    __extends(RackController, _super);
    function RackController(doc, config) {
        var _this = _super.call(this, __assign(__assign({}, config), { view: new plain_1.PlainView(doc, {
                viewName: 'brk',
                viewProps: config.viewProps,
            }) })) || this;
        _this.onRackAdd_ = _this.onRackAdd_.bind(_this);
        _this.onRackRemove_ = _this.onRackRemove_.bind(_this);
        var rack = new blade_rack_1.BladeRack({
            blade: config.root ? undefined : config.blade,
            viewProps: config.viewProps,
        });
        rack.emitter.on('add', _this.onRackAdd_);
        rack.emitter.on('remove', _this.onRackRemove_);
        _this.rack = rack;
        _this.viewProps.handleDispose(function () {
            for (var i = _this.rack.children.length - 1; i >= 0; i--) {
                var bc = _this.rack.children[i];
                bc.viewProps.set('disposed', true);
            }
        });
        return _this;
    }
    RackController.prototype.onRackAdd_ = function (ev) {
        if (!ev.isRoot) {
            return;
        }
        dom_util_1.insertElementAt(this.view.element, ev.bladeController.view.element, ev.index);
    };
    RackController.prototype.onRackRemove_ = function (ev) {
        if (!ev.isRoot) {
            return;
        }
        dom_util_1.removeElement(ev.bladeController.view.element);
    };
    return RackController;
}(blade_1.BladeController));
exports.RackController = RackController;
