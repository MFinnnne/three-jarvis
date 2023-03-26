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
exports.ButtonApi = void 0;
var blade_1 = require("../../common/api/blade");
var tp_event_1 = require("../../common/api/tp-event");
var ButtonApi = /** @class */ (function (_super) {
    __extends(ButtonApi, _super);
    function ButtonApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ButtonApi.prototype, "label", {
        get: function () {
            return this.controller_.props.get('label');
        },
        set: function (label) {
            this.controller_.props.set('label', label);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ButtonApi.prototype, "title", {
        get: function () {
            var _a;
            return (_a = this.controller_.valueController.props.get('title')) !== null && _a !== void 0 ? _a : '';
        },
        set: function (title) {
            this.controller_.valueController.props.set('title', title);
        },
        enumerable: false,
        configurable: true
    });
    ButtonApi.prototype.on = function (eventName, handler) {
        var _this = this;
        var bh = handler.bind(this);
        var emitter = this.controller_.valueController.emitter;
        emitter.on(eventName, function () {
            bh(new tp_event_1.TpEvent(_this));
        });
        return this;
    };
    return ButtonApi;
}(blade_1.BladeApi));
exports.ButtonApi = ButtonApi;
