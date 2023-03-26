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
exports.RackLikeController = void 0;
var blade_1 = require("./blade");
var RackLikeController = /** @class */ (function (_super) {
    __extends(RackLikeController, _super);
    function RackLikeController(config) {
        var _this = _super.call(this, {
            blade: config.blade,
            view: config.view,
            viewProps: config.rackController.viewProps,
        }) || this;
        _this.rackController = config.rackController;
        return _this;
    }
    return RackLikeController;
}(blade_1.BladeController));
exports.RackLikeController = RackLikeController;
