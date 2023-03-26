"use strict";
exports.__esModule = true;
exports.SliderView = void 0;
var number_util_1 = require("../../../common/number-util");
var class_name_1 = require("../../../common/view/class-name");
var className = class_name_1.ClassName('sld');
/**
 * @hidden
 */
var SliderView = /** @class */ (function () {
    function SliderView(doc, config) {
        this.onChange_ = this.onChange_.bind(this);
        this.props_ = config.props;
        this.props_.emitter.on('change', this.onChange_);
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        config.viewProps.bindClassModifiers(this.element);
        var trackElem = doc.createElement('div');
        trackElem.classList.add(className('t'));
        config.viewProps.bindTabIndex(trackElem);
        this.element.appendChild(trackElem);
        this.trackElement = trackElem;
        var knobElem = doc.createElement('div');
        knobElem.classList.add(className('k'));
        this.trackElement.appendChild(knobElem);
        this.knobElement = knobElem;
        config.value.emitter.on('change', this.onChange_);
        this.value = config.value;
        this.update_();
    }
    SliderView.prototype.update_ = function () {
        var p = number_util_1.constrainRange(number_util_1.mapRange(this.value.rawValue, this.props_.get('minValue'), this.props_.get('maxValue'), 0, 100), 0, 100);
        this.knobElement.style.width = p + "%";
    };
    SliderView.prototype.onChange_ = function () {
        this.update_();
    };
    return SliderView;
}());
exports.SliderView = SliderView;
