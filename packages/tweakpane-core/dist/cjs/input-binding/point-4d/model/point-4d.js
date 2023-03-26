"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point4dAssembly = exports.Point4d = void 0;
var type_util_1 = require("../../../misc/type-util");
var Point4d = /** @class */ (function () {
    function Point4d(x, y, z, w) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        if (w === void 0) { w = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    Point4d.prototype.getComponents = function () {
        return [this.x, this.y, this.z, this.w];
    };
    Point4d.isObject = function (obj) {
        if (type_util_1.isEmpty(obj)) {
            return false;
        }
        var x = obj.x;
        var y = obj.y;
        var z = obj.z;
        var w = obj.w;
        if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number' || typeof w !== 'number') {
            return false;
        }
        return true;
    };
    Point4d.equals = function (v1, v2) {
        return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z && v1.w === v2.w;
    };
    Point4d.prototype.toObject = function () {
        return {
            x: this.x,
            y: this.y,
            z: this.z,
            w: this.w,
        };
    };
    return Point4d;
}());
exports.Point4d = Point4d;
exports.Point4dAssembly = {
    toComponents: function (p) { return p.getComponents(); },
    fromComponents: function (comps) { return new (Point4d.bind.apply(Point4d, __spreadArray([void 0], comps)))(); },
};
