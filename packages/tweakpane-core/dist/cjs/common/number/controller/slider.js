"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderController = void 0;
var number_util_1 = require("../../number-util");
var ui_1 = require("../../ui");
var pointer_handler_1 = require("../../view/pointer-handler");
var slider_1 = require("../view/slider");
/**
 * @hidden
 */
var SliderController = /** @class */ (function () {
    function SliderController(doc, config) {
        this.onKeyDown_ = this.onKeyDown_.bind(this);
        this.onKeyUp_ = this.onKeyUp_.bind(this);
        this.onPointerDownOrMove_ = this.onPointerDownOrMove_.bind(this);
        this.onPointerUp_ = this.onPointerUp_.bind(this);
        this.baseStep_ = config.baseStep;
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.props = config.props;
        this.view = new slider_1.SliderView(doc, {
            props: this.props,
            value: this.value,
            viewProps: this.viewProps,
        });
        this.ptHandler_ = new pointer_handler_1.PointerHandler(this.view.trackElement);
        this.ptHandler_.emitter.on('down', this.onPointerDownOrMove_);
        this.ptHandler_.emitter.on('move', this.onPointerDownOrMove_);
        this.ptHandler_.emitter.on('up', this.onPointerUp_);
        this.view.trackElement.addEventListener('keydown', this.onKeyDown_);
        this.view.trackElement.addEventListener('keyup', this.onKeyUp_);
    }
    SliderController.prototype.handlePointerEvent_ = function (d, opts) {
        if (!d.point) {
            return;
        }
        this.value.setRawValue(number_util_1.mapRange(number_util_1.constrainRange(d.point.x, 0, d.bounds.width), 0, d.bounds.width, this.props.get('minValue'), this.props.get('maxValue')), opts);
    };
    SliderController.prototype.onPointerDownOrMove_ = function (ev) {
        this.handlePointerEvent_(ev.data, {
            forceEmit: false,
            emit: true,
            last: false,
        });
    };
    SliderController.prototype.onPointerUp_ = function (ev) {
        this.handlePointerEvent_(ev.data, {
            forceEmit: true,
            emit: true,
            last: true,
        });
    };
    SliderController.prototype.onKeyDown_ = function (ev) {
        var step = ui_1.getStepForKey(this.baseStep_, ui_1.getHorizontalStepKeys(ev));
        if (step === 0) {
            return;
        }
        this.value.setRawValue(this.value.rawValue + step, {
            forceEmit: false,
            emit: true,
            last: false,
        });
    };
    SliderController.prototype.onKeyUp_ = function (ev) {
        var step = ui_1.getStepForKey(this.baseStep_, ui_1.getHorizontalStepKeys(ev));
        if (step === 0) {
            return;
        }
        this.value.setRawValue(this.value.rawValue, {
            forceEmit: true,
            emit: true,
            last: true,
        });
    };
    return SliderController;
}());
exports.SliderController = SliderController;
