"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SvPaletteController = void 0;
var number_util_1 = require("../../../common/number-util");
var ui_1 = require("../../../common/ui");
var pointer_handler_1 = require("../../../common/view/pointer-handler");
var color_1 = require("../model/color");
var util_1 = require("../util");
var sv_palette_1 = require("../view/sv-palette");
/**
 * @hidden
 */
var SvPaletteController = /** @class */ (function () {
    function SvPaletteController(doc, config) {
        this.onKeyDown_ = this.onKeyDown_.bind(this);
        this.onKeyUp_ = this.onKeyUp_.bind(this);
        this.onPointerDown_ = this.onPointerDown_.bind(this);
        this.onPointerMove_ = this.onPointerMove_.bind(this);
        this.onPointerUp_ = this.onPointerUp_.bind(this);
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.view = new sv_palette_1.SvPaletteView(doc, {
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
    SvPaletteController.prototype.handlePointerEvent_ = function (d, opts) {
        if (!d.point) {
            return;
        }
        var saturation = number_util_1.mapRange(d.point.x, 0, d.bounds.width, 0, 100);
        var value = number_util_1.mapRange(d.point.y, 0, d.bounds.height, 100, 0);
        var _a = this.value.rawValue.getComponents('hsv'), h = _a[0], a = _a[3];
        this.value.setRawValue(new color_1.Color([h, saturation, value, a], 'hsv'), opts);
    };
    SvPaletteController.prototype.onPointerDown_ = function (ev) {
        this.handlePointerEvent_(ev.data, {
            forceEmit: false,
            emit: true,
            last: false,
        });
    };
    SvPaletteController.prototype.onPointerMove_ = function (ev) {
        this.handlePointerEvent_(ev.data, {
            forceEmit: false,
            emit: true,
            last: false,
        });
    };
    SvPaletteController.prototype.onPointerUp_ = function (ev) {
        this.handlePointerEvent_(ev.data, {
            forceEmit: true,
            emit: true,
            last: true,
        });
    };
    SvPaletteController.prototype.onKeyDown_ = function (ev) {
        if (ui_1.isArrowKey(ev.key)) {
            ev.preventDefault();
        }
        var _a = this.value.rawValue.getComponents('hsv'), h = _a[0], s = _a[1], v = _a[2], a = _a[3];
        var baseStep = util_1.getBaseStepForColor(false);
        var ds = ui_1.getStepForKey(baseStep, ui_1.getHorizontalStepKeys(ev));
        var dv = ui_1.getStepForKey(baseStep, ui_1.getVerticalStepKeys(ev));
        if (ds === 0 && dv === 0) {
            return;
        }
        this.value.setRawValue(new color_1.Color([h, s + ds, v + dv, a], 'hsv'), {
            forceEmit: false,
            emit: true,
            last: false,
        });
    };
    SvPaletteController.prototype.onKeyUp_ = function (ev) {
        var baseStep = util_1.getBaseStepForColor(false);
        var ds = ui_1.getStepForKey(baseStep, ui_1.getHorizontalStepKeys(ev));
        var dv = ui_1.getStepForKey(baseStep, ui_1.getVerticalStepKeys(ev));
        if (ds === 0 && dv === 0) {
            return;
        }
        this.value.setRawValue(this.value.rawValue, {
            forceEmit: true,
            emit: true,
            last: true,
        });
    };
    return SvPaletteController;
}());
exports.SvPaletteController = SvPaletteController;
