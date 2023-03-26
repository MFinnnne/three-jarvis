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
exports.LabeledValueController = void 0;
var value_blade_1 = require("../../common/controller/value-blade");
var label_1 = require("../view/label");
var LabeledValueController = /** @class */ (function (_super) {
    __extends(LabeledValueController, _super);
    function LabeledValueController(doc, config) {
        var _this = this;
        var viewProps = config.valueController.viewProps;
        _this = _super.call(this, __assign(__assign({}, config), { value: config.valueController.value, view: new label_1.LabelView(doc, {
                props: config.props,
                viewProps: viewProps,
            }), viewProps: viewProps })) || this;
        _this.props = config.props;
        _this.valueController = config.valueController;
        _this.view.valueElement.appendChild(_this.valueController.view.element);
        return _this;
    }
    return LabeledValueController;
}(value_blade_1.ValueBladeController));
exports.LabeledValueController = LabeledValueController;
