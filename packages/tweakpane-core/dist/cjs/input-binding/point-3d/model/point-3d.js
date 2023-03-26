"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point3dAssembly = exports.Point3d = void 0;
var type_util_1 = require("../../../misc/type-util");
var Point3d = /** @class */ (function () {
    function Point3d(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Point3d.prototype.getComponents = function () {
        return [this.x, this.y, this.z];
    };
    Point3d.isObject = function (obj) {
        if (type_util_1.isEmpty(obj)) {
            return false;
        }
        var x = obj.x;
        var y = obj.y;
        var z = obj.z;
        if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number') {
            return false;
        }
        return true;
    };
    Point3d.equals = function (v1, v2) {
        return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z;
    };
    Point3d.prototype.toObject = function () {
        return {
            x: this.x,
            y: this.y,
            z: this.z,
        };
    };
    return Point3d;
}());
exports.Point3d = Point3d;
exports.Point3dAssembly = {
    toComponents: function (p) { return p.getComponents(); },
    fromComponents: function (comps) { return new (Point3d.bind.apply(Point3d, __spreadArray([void 0], comps)))(); },
};
