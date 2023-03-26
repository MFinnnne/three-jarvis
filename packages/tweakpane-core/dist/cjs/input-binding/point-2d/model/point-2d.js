"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point2dAssembly = exports.Point2d = void 0;
var type_util_1 = require("../../../misc/type-util");
var Point2d = /** @class */ (function () {
    function Point2d(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Point2d.prototype.getComponents = function () {
        return [this.x, this.y];
    };
    Point2d.isObject = function (obj) {
        if (type_util_1.isEmpty(obj)) {
            return false;
        }
        var x = obj.x;
        var y = obj.y;
        if (typeof x !== 'number' || typeof y !== 'number') {
            return false;
        }
        return true;
    };
    Point2d.equals = function (v1, v2) {
        return v1.x === v2.x && v1.y === v2.y;
    };
    Point2d.prototype.toObject = function () {
        return {
            x: this.x,
            y: this.y,
        };
    };
    return Point2d;
}());
exports.Point2d = Point2d;
exports.Point2dAssembly = {
    toComponents: function (p) { return p.getComponents(); },
    fromComponents: function (comps) { return new (Point2d.bind.apply(Point2d, __spreadArray([void 0], comps)))(); },
};
