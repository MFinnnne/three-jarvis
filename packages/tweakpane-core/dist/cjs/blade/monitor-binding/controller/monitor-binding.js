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
exports.MonitorBindingController = void 0;
var label_1 = require("../../label/controller/label");
/**
 * @hidden
 */
var MonitorBindingController = /** @class */ (function (_super) {
    __extends(MonitorBindingController, _super);
    function MonitorBindingController(doc, config) {
        var _this = _super.call(this, doc, config) || this;
        _this.binding = config.binding;
        _this.viewProps.bindDisabled(_this.binding.ticker);
        _this.viewProps.handleDispose(function () {
            _this.binding.dispose();
        });
        return _this;
    }
    return MonitorBindingController;
}(label_1.LabelController));
exports.MonitorBindingController = MonitorBindingController;
