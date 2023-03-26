"use strict";
exports.__esModule = true;
exports.Color = void 0;
var type_util_1 = require("../../../misc/type-util");
var color_model_1 = require("./color-model");
function isRgbColorComponent(obj, key) {
    if (typeof obj !== 'object' || type_util_1.isEmpty(obj)) {
        return false;
    }
    return key in obj && typeof obj[key] === 'number';
}
// TODO: Make type required in the next major version
/**
 * @hidden
 */
var Color = /** @class */ (function () {
    function Color(comps, mode, type) {
        if (type === void 0) { type = 'int'; }
        this.mode = mode;
        this.type = type;
        this.comps_ = color_model_1.constrainColorComponents(comps, mode, type);
    }
    Color.black = function (type) {
        if (type === void 0) { type = 'int'; }
        return new Color([0, 0, 0], 'rgb', type);
    };
    Color.fromObject = function (obj, type) {
        if (type === void 0) { type = 'int'; }
        var comps = 'a' in obj ? [obj.r, obj.g, obj.b, obj.a] : [obj.r, obj.g, obj.b];
        return new Color(comps, 'rgb', type);
    };
    Color.toRgbaObject = function (color, type) {
        if (type === void 0) { type = 'int'; }
        return color.toRgbaObject(type);
    };
    Color.isRgbColorObject = function (obj) {
        return isRgbColorComponent(obj, 'r') && isRgbColorComponent(obj, 'g') && isRgbColorComponent(obj, 'b');
    };
    Color.isRgbaColorObject = function (obj) {
        return this.isRgbColorObject(obj) && isRgbColorComponent(obj, 'a');
    };
    Color.isColorObject = function (obj) {
        return this.isRgbColorObject(obj);
    };
    Color.equals = function (v1, v2) {
        if (v1.mode !== v2.mode) {
            return false;
        }
        var comps1 = v1.comps_;
        var comps2 = v2.comps_;
        for (var i = 0; i < comps1.length; i++) {
            if (comps1[i] !== comps2[i]) {
                return false;
            }
        }
        return true;
    };
    Color.prototype.getComponents = function (opt_mode, type) {
        if (type === void 0) { type = 'int'; }
        return color_model_1.appendAlphaComponent(color_model_1.convertColor(color_model_1.removeAlphaComponent(this.comps_), { mode: this.mode, type: this.type }, { mode: opt_mode !== null && opt_mode !== void 0 ? opt_mode : this.mode, type: type }), this.comps_[3]);
    };
    Color.prototype.toRgbaObject = function (type) {
        if (type === void 0) { type = 'int'; }
        var rgbComps = this.getComponents('rgb', type);
        return {
            r: rgbComps[0],
            g: rgbComps[1],
            b: rgbComps[2],
            a: rgbComps[3]
        };
    };
    return Color;
}());
exports.Color = Color;
