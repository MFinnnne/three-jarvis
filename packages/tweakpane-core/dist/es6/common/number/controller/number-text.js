"use strict";
exports.__esModule = true;
exports.NumberTextController = void 0;
var type_util_1 = require("../../../misc/type-util");
var values_1 = require("../../model/values");
var ui_1 = require("../../ui");
var pointer_handler_1 = require("../../view/pointer-handler");
var number_text_1 = require("../view/number-text");
/**
 * @hidden
 */
var NumberTextController = /** @class */ (function () {
    function NumberTextController(doc, config) {
        var _a;
        this.originRawValue_ = 0;
        this.onInputChange_ = this.onInputChange_.bind(this);
        this.onInputKeyDown_ = this.onInputKeyDown_.bind(this);
        this.onInputKeyUp_ = this.onInputKeyUp_.bind(this);
        this.onPointerDown_ = this.onPointerDown_.bind(this);
        this.onPointerMove_ = this.onPointerMove_.bind(this);
        this.onPointerUp_ = this.onPointerUp_.bind(this);
        this.baseStep_ = config.baseStep;
        this.parser_ = config.parser;
        this.props = config.props;
        this.sliderProps_ = (_a = config.sliderProps) !== null && _a !== void 0 ? _a : null;
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.dragging_ = values_1.createValue(null);
        this.view = new number_text_1.NumberTextView(doc, {
            arrayPosition: config.arrayPosition,
            dragging: this.dragging_,
            props: this.props,
            value: this.value,
            viewProps: this.viewProps
        });
        this.view.inputElement.addEventListener('change', this.onInputChange_);
        this.view.inputElement.addEventListener('keydown', this.onInputKeyDown_);
        this.view.inputElement.addEventListener('keyup', this.onInputKeyUp_);
        var ph = new pointer_handler_1.PointerHandler(this.view.knobElement);
        ph.emitter.on('down', this.onPointerDown_);
        ph.emitter.on('move', this.onPointerMove_);
        ph.emitter.on('up', this.onPointerUp_);
    }
    NumberTextController.prototype.constrainValue_ = function (value) {
        var _a, _b;
        var min = (_a = this.sliderProps_) === null || _a === void 0 ? void 0 : _a.get('minValue');
        var max = (_b = this.sliderProps_) === null || _b === void 0 ? void 0 : _b.get('maxValue');
        var v = value;
        if (min !== undefined) {
            v = Math.max(v, min);
        }
        if (max !== undefined) {
            v = Math.min(v, max);
        }
        return v;
    };
    NumberTextController.prototype.onInputChange_ = function (e) {
        var inputElem = type_util_1.forceCast(e.currentTarget);
        var value = inputElem.value;
        var parsedValue = this.parser_(value);
        if (!type_util_1.isEmpty(parsedValue)) {
            this.value.rawValue = this.constrainValue_(parsedValue);
        }
        this.view.refresh();
    };
    NumberTextController.prototype.onInputKeyDown_ = function (ev) {
        var step = ui_1.getStepForKey(this.baseStep_, ui_1.getVerticalStepKeys(ev));
        if (step === 0) {
            return;
        }
        this.value.setRawValue(this.constrainValue_(this.value.rawValue + step), {
            forceEmit: false,
            emit: true,
            last: false,
            before: true
        });
    };
    NumberTextController.prototype.onInputKeyUp_ = function (ev) {
        var step = ui_1.getStepForKey(this.baseStep_, ui_1.getVerticalStepKeys(ev));
        if (step === 0) {
            return;
        }
        this.value.setRawValue(this.value.rawValue, {
            forceEmit: true,
            emit: true,
            last: true,
            before: false
        });
    };
    NumberTextController.prototype.onPointerDown_ = function () {
        this.originRawValue_ = this.value.rawValue;
        this.dragging_.rawValue = 0;
    };
    NumberTextController.prototype.computeDraggingValue_ = function (data) {
        if (!data.point) {
            return null;
        }
        var dx = data.point.x - data.bounds.width / 2;
        return this.constrainValue_(this.originRawValue_ + dx * this.props.get('draggingScale'));
    };
    NumberTextController.prototype.onPointerMove_ = function (ev) {
        var v = this.computeDraggingValue_(ev.data);
        if (v === null) {
            return;
        }
        this.value.setRawValue(v, {
            forceEmit: false,
            emit: true,
            last: false,
            before: false
        });
        this.dragging_.rawValue = this.value.rawValue - this.originRawValue_;
    };
    NumberTextController.prototype.onPointerUp_ = function (ev) {
        var v = this.computeDraggingValue_(ev.data);
        if (v === null) {
            return;
        }
        this.value.setRawValue(v, {
            forceEmit: true,
            last: true,
            emit: true,
            before: false
        });
        this.dragging_.rawValue = null;
    };
    return NumberTextController;
}());
exports.NumberTextController = NumberTextController;
