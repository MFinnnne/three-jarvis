"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point2dPickerController = void 0;
var number_util_1 = require("../../../common/number-util");
var ui_1 = require("../../../common/ui");
var pointer_handler_1 = require("../../../common/view/pointer-handler");
var point_2d_1 = require("../model/point-2d");
var point_2d_picker_1 = require("../view/point-2d-picker");
function computeOffset(ev, baseSteps, invertsY) {
    return [ui_1.getStepForKey(baseSteps[0], ui_1.getHorizontalStepKeys(ev)), ui_1.getStepForKey(baseSteps[1], ui_1.getVerticalStepKeys(ev)) * (invertsY ? 1 : -1)];
}
/**
 * @hidden
 */
var Point2dPickerController = /** @class */ (function () {
    function Point2dPickerController(doc, config) {
        this.onPadKeyDown_ = this.onPadKeyDown_.bind(this);
        this.onPadKeyUp_ = this.onPadKeyUp_.bind(this);
        this.onPointerDown_ = this.onPointerDown_.bind(this);
        this.onPointerMove_ = this.onPointerMove_.bind(this);
        this.onPointerUp_ = this.onPointerUp_.bind(this);
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.baseSteps_ = config.baseSteps;
        this.maxValue_ = config.maxValue;
        this.invertsY_ = config.invertsY;
        this.view = new point_2d_picker_1.Point2dPickerView(doc, {
            invertsY: this.invertsY_,
            layout: config.layout,
            maxValue: this.maxValue_,
            value: this.value,
            viewProps: this.viewProps,
        });
        this.ptHandler_ = new pointer_handler_1.PointerHandler(this.view.padElement);
        this.ptHandler_.emitter.on('down', this.onPointerDown_);
        this.ptHandler_.emitter.on('move', this.onPointerMove_);
        this.ptHandler_.emitter.on('up', this.onPointerUp_);
        this.view.padElement.addEventListener('keydown', this.onPadKeyDown_);
        this.view.padElement.addEventListener('keyup', this.onPadKeyUp_);
    }
    Point2dPickerController.prototype.handlePointerEvent_ = function (d, opts) {
        if (!d.point) {
            return;
        }
        var max = this.maxValue_;
        var px = number_util_1.mapRange(d.point.x, 0, d.bounds.width, -max, +max);
        var py = number_util_1.mapRange(this.invertsY_ ? d.bounds.height - d.point.y : d.point.y, 0, d.bounds.height, -max, +max);
        this.value.setRawValue(new point_2d_1.Point2d(px, py), opts);
    };
    Point2dPickerController.prototype.onPointerDown_ = function (ev) {
        this.handlePointerEvent_(ev.data, {
            forceEmit: false,
            emit: true,
            last: false,
        });
    };
    Point2dPickerController.prototype.onPointerMove_ = function (ev) {
        this.handlePointerEvent_(ev.data, {
            forceEmit: false,
            emit: true,
            last: false,
        });
    };
    Point2dPickerController.prototype.onPointerUp_ = function (ev) {
        this.handlePointerEvent_(ev.data, {
            forceEmit: true,
            emit: true,
            last: true,
        });
    };
    Point2dPickerController.prototype.onPadKeyDown_ = function (ev) {
        if (ui_1.isArrowKey(ev.key)) {
            ev.preventDefault();
        }
        var _a = computeOffset(ev, this.baseSteps_, this.invertsY_), dx = _a[0], dy = _a[1];
        if (dx === 0 && dy === 0) {
            return;
        }
        this.value.setRawValue(new point_2d_1.Point2d(this.value.rawValue.x + dx, this.value.rawValue.y + dy), {
            forceEmit: false,
            emit: true,
            last: false,
        });
    };
    Point2dPickerController.prototype.onPadKeyUp_ = function (ev) {
        var _a = computeOffset(ev, this.baseSteps_, this.invertsY_), dx = _a[0], dy = _a[1];
        if (dx === 0 && dy === 0) {
            return;
        }
        this.value.setRawValue(this.value.rawValue, {
            forceEmit: true,
            emit: true,
            last: true,
        });
    };
    return Point2dPickerController;
}());
exports.Point2dPickerController = Point2dPickerController;
