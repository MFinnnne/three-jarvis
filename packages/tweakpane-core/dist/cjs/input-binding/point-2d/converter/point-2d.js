"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writePoint2d = exports.point2dFromUnknown = void 0;
var point_2d_1 = require("../model/point-2d");
function point2dFromUnknown(value) {
    return point_2d_1.Point2d.isObject(value) ? new point_2d_1.Point2d(value.x, value.y) : new point_2d_1.Point2d();
}
exports.point2dFromUnknown = point2dFromUnknown;
function writePoint2d(target, value) {
    target.writeProperty('x', value.x);
    target.writeProperty('y', value.y);
}
exports.writePoint2d = writePoint2d;
