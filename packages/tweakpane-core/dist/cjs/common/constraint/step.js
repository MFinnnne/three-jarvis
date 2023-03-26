"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepConstraint = void 0;
/**
 * A number step range constraint.
 */
var StepConstraint = /** @class */ (function () {
    function StepConstraint(step, origin) {
        if (origin === void 0) { origin = 0; }
        this.step = step;
        this.origin = origin;
    }
    StepConstraint.prototype.constrain = function (value) {
        var o = this.origin % this.step;
        var r = Math.round((value - o) / this.step);
        return o + r * this.step;
    };
    return StepConstraint;
}());
exports.StepConstraint = StepConstraint;
