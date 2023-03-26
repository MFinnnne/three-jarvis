"use strict";
exports.__esModule = true;
exports.MultiLogView = void 0;
var class_name_1 = require("../../../common/view/class-name");
var className = class_name_1.ClassName('mll');
/**
 * @hidden
 */
var MultiLogView = /** @class */ (function () {
    function MultiLogView(doc, config) {
        this.onValueUpdate_ = this.onValueUpdate_.bind(this);
        this.formatter_ = config.formatter;
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        config.viewProps.bindClassModifiers(this.element);
        var textareaElem = doc.createElement('textarea');
        textareaElem.classList.add(className('i'));
        textareaElem.style.height = "calc(var(--bld-us) * " + config.lineCount + ")";
        textareaElem.readOnly = true;
        config.viewProps.bindDisabled(textareaElem);
        this.element.appendChild(textareaElem);
        this.textareaElem_ = textareaElem;
        config.value.emitter.on('change', this.onValueUpdate_);
        this.value = config.value;
        this.update_();
    }
    MultiLogView.prototype.update_ = function () {
        var _this = this;
        var elem = this.textareaElem_;
        var shouldScroll = elem.scrollTop === elem.scrollHeight - elem.clientHeight;
        var lines = [];
        this.value.rawValue.forEach(function (value) {
            if (value !== undefined) {
                lines.push(_this.formatter_(value));
            }
        });
        elem.textContent = lines.join('\n');
        if (shouldScroll) {
            elem.scrollTop = elem.scrollHeight;
        }
    };
    MultiLogView.prototype.onValueUpdate_ = function () {
        this.update_();
    };
    return MultiLogView;
}());
exports.MultiLogView = MultiLogView;
