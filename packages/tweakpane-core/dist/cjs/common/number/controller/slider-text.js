"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderTextController = void 0;
var slider_text_1 = require("../view/slider-text");
var number_text_1 = require("./number-text");
var slider_1 = require("./slider");
var SliderTextController = /** @class */ (function () {
    function SliderTextController(doc, config) {
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.sliderC_ = new slider_1.SliderController(doc, {
            baseStep: config.baseStep,
            props: config.sliderProps,
            value: config.value,
            viewProps: this.viewProps,
        });
        this.textC_ = new number_text_1.NumberTextController(doc, {
            baseStep: config.baseStep,
            parser: config.parser,
            props: config.textProps,
            sliderProps: config.sliderProps,
            value: config.value,
            viewProps: config.viewProps,
        });
        this.view = new slider_text_1.SliderTextView(doc, {
            sliderView: this.sliderC_.view,
            textView: this.textC_.view,
        });
    }
    Object.defineProperty(SliderTextController.prototype, "sliderController", {
        get: function () {
            return this.sliderC_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SliderTextController.prototype, "textController", {
        get: function () {
            return this.textC_;
        },
        enumerable: false,
        configurable: true
    });
    return SliderTextController;
}());
exports.SliderTextController = SliderTextController;
