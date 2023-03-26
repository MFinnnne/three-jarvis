"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextView = void 0;
var class_name_1 = require("./class-name");
var className = class_name_1.ClassName('txt');
/**
 * @hidden
 */
var TextView = /** @class */ (function () {
    function TextView(doc, config) {
        this.onChange_ = this.onChange_.bind(this);
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        config.viewProps.bindClassModifiers(this.element);
        this.props_ = config.props;
        this.props_.emitter.on('change', this.onChange_);
        var inputElem = doc.createElement('input');
        inputElem.classList.add(className('i'));
        inputElem.type = 'text';
        config.viewProps.bindDisabled(inputElem);
        this.element.appendChild(inputElem);
        this.inputElement = inputElem;
        config.value.emitter.on('change', this.onChange_);
        this.value_ = config.value;
        this.refresh();
    }
    TextView.prototype.refresh = function () {
        var formatter = this.props_.get('formatter');
        this.inputElement.value = formatter(this.value_.rawValue);
    };
    TextView.prototype.onChange_ = function () {
        this.refresh();
    };
    return TextView;
}());
exports.TextView = TextView;
