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
exports.SeparatorApi = void 0;
var blade_1 = require("../../common/api/blade");
var SeparatorApi = /** @class */ (function (_super) {
    __extends(SeparatorApi, _super);
    function SeparatorApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SeparatorApi;
}(blade_1.BladeApi));
exports.SeparatorApi = SeparatorApi;
