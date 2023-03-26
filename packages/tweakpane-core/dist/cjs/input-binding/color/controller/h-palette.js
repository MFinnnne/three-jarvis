"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HPaletteController = void 0;
var number_util_1 = require("../../../common/number-util");
var ui_1 = require("../../../common/ui");
var pointer_handler_1 = require("../../../common/view/pointer-handler");
var color_1 = require("../model/color");
var util_1 = require("../util");
var h_palette_1 = require("../view/h-palette");
/**
 * @hidden
 */
var HPaletteController = /** @class */ (function () {
    function HPaletteController(doc, config) {
        this.onKeyDown_ = this.onKeyDown_.bind(this);
        this.onKeyUp_ = this.onKeyUp_.bind(this);
        this.onPointerDown_ = this.onPointerDown_.bind(this);
        this.onPointerMove_ = this.onPointerMove_.bind(this);
        this.onPointerUp_ = this.onPointerUp_.bind(this);
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.view = new h_palette_1.HPaletteView(doc, {
            value: this.value,
            viewProps: this.viewProps,
        });
        this.ptHandler_ = new pointer_handler_1.PointerHandler(this.view.element);
        this.ptHandler_.emitter.on('down', this.onPointerDown_);
        this.ptHandler_.emitter.on('move', this.onPointerMove_);
        this.ptHandler_.emitter.on('up', this.onPointerUp_);
        this.view.element.addEventListener('keydown', this.onKeyDown_);
        this.view.element.addEventListener('keyup', this.onKeyUp_);
    }
    HPaletteController.prototype.handlePointerEvent_ = function (d, opts) {
        if (!d.point) {
            return;
        }
        var hue = number_util_1.mapRange(number_util_1.constrainRange(d.point.x, 0, d.bounds.width), 0, d.bounds.width, 0, 360);
        var c = this.value.rawValue;
        var _a = c.getComponents('hsv'), s = _a[1], v = _a[2], a = _a[3];
        this.value.setRawValue(new color_1.Color([hue, s, v, a], 'hsv'), opts);
    };
    HPaletteController.prototype.onPointerDown_ = function (ev) {
        this.handlePointerEvent_(ev.data, {
            forceEmit: false,
            last: false,
            emit: true,
        });
    };
    HPaletteController.prototype.onPointerMove_ = function (ev) {
        this.handlePointerEvent_(ev.data, {
            forceEmit: false,
            emit: true,
            last: false,
        });
    };
    HPaletteController.prototype.onPointerUp_ = function (ev) {
        this.handlePointerEvent_(ev.data, {
            forceEmit: true,
            emit: true,
            last: true,
        });
    };
    HPaletteController.prototype.onKeyDown_ = function (ev) {
        var step = ui_1.getStepForKey(util_1.getBaseStepForColor(false), ui_1.getHorizontalStepKeys(ev));
        if (step === 0) {
            return;
        }
        var c = this.value.rawValue;
        var _a = c.getComponents('hsv'), h = _a[0], s = _a[1], v = _a[2], a = _a[3];
        this.value.setRawValue(new color_1.Color([h + step, s, v, a], 'hsv'), {
            forceEmit: false,
            emit: true,
            last: false,
        });
    };
    HPaletteController.prototype.onKeyUp_ = function (ev) {
        var step = ui_1.getStepForKey(util_1.getBaseStepForColor(false), ui_1.getHorizontalStepKeys(ev));
        if (step === 0) {
            return;
        }
        this.value.setRawValue(this.value.rawValue, {
            forceEmit: true,
            emit: true,
            last: true,
        });
    };
    return HPaletteController;
}());
exports.HPaletteController = HPaletteController;
