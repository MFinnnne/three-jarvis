"use strict";
exports.__esModule = true;
exports.APaletteController = void 0;
var ui_1 = require("../../../common/ui");
var pointer_handler_1 = require("../../../common/view/pointer-handler");
var color_1 = require("../model/color");
var util_1 = require("../util");
var a_palette_1 = require("../view/a-palette");
/**
 * @hidden
 */
var APaletteController = /** @class */ (function () {
    function APaletteController(doc, config) {
        this.onKeyDown_ = this.onKeyDown_.bind(this);
        this.onKeyUp_ = this.onKeyUp_.bind(this);
        this.onPointerDown_ = this.onPointerDown_.bind(this);
        this.onPointerMove_ = this.onPointerMove_.bind(this);
        this.onPointerUp_ = this.onPointerUp_.bind(this);
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.view = new a_palette_1.APaletteView(doc, {
            value: this.value,
            viewProps: this.viewProps
        });
        this.ptHandler_ = new pointer_handler_1.PointerHandler(this.view.element);
        this.ptHandler_.emitter.on('down', this.onPointerDown_);
        this.ptHandler_.emitter.on('move', this.onPointerMove_);
        this.ptHandler_.emitter.on('up', this.onPointerUp_);
        this.view.element.addEventListener('keydown', this.onKeyDown_);
        this.view.element.addEventListener('keyup', this.onKeyUp_);
    }
    APaletteController.prototype.handlePointerEvent_ = function (d, opts) {
        if (!d.point) {
            return;
        }
        var alpha = d.point.x / d.bounds.width;
        var c = this.value.rawValue;
        var _a = c.getComponents('hsv'), h = _a[0], s = _a[1], v = _a[2];
        this.value.setRawValue(new color_1.Color([h, s, v, alpha], 'hsv'), opts);
    };
    APaletteController.prototype.onPointerDown_ = function (ev) {
        this.handlePointerEvent_(ev.data, {
            forceEmit: false,
            emit: true,
            last: false
        });
    };
    APaletteController.prototype.onPointerMove_ = function (ev) {
        this.handlePointerEvent_(ev.data, {
            forceEmit: false,
            emit: true,
            last: false
        });
    };
    APaletteController.prototype.onPointerUp_ = function (ev) {
        this.handlePointerEvent_(ev.data, {
            forceEmit: true,
            emit: true,
            last: true
        });
    };
    APaletteController.prototype.onKeyDown_ = function (ev) {
        var step = ui_1.getStepForKey(util_1.getBaseStepForColor(true), ui_1.getHorizontalStepKeys(ev));
        if (step === 0) {
            return;
        }
        var c = this.value.rawValue;
        var _a = c.getComponents('hsv'), h = _a[0], s = _a[1], v = _a[2], a = _a[3];
        this.value.setRawValue(new color_1.Color([h, s, v, a + step], 'hsv'), {
            forceEmit: false,
            emit: true,
            last: false
        });
    };
    APaletteController.prototype.onKeyUp_ = function (ev) {
        var step = ui_1.getStepForKey(util_1.getBaseStepForColor(true), ui_1.getHorizontalStepKeys(ev));
        if (step === 0) {
            return;
        }
        this.value.setRawValue(this.value.rawValue, {
            forceEmit: true,
            emit: true,
            last: true
        });
    };
    return APaletteController;
}());
exports.APaletteController = APaletteController;
