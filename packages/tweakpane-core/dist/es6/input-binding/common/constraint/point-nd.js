"use strict";
exports.__esModule = true;
exports.PointNdConstraint = void 0;
/**
 * @hidden
 */
var PointNdConstraint = /** @class */ (function () {
    function PointNdConstraint(config) {
        this.components = config.components;
        this.asm_ = config.assembly;
    }
    PointNdConstraint.prototype.constrain = function (value) {
        var _this = this;
        var comps = this.asm_.toComponents(value).map(function (comp, index) { var _a, _b; return (_b = (_a = _this.components[index]) === null || _a === void 0 ? void 0 : _a.constrain(comp)) !== null && _b !== void 0 ? _b : comp; });
        return this.asm_.fromComponents(comps);
    };
    return PointNdConstraint;
}());
exports.PointNdConstraint = PointNdConstraint;
