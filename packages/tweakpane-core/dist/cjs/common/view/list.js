"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListView = void 0;
var dom_util_1 = require("../dom-util");
var reactive_1 = require("../model/reactive");
var class_name_1 = require("./class-name");
var className = class_name_1.ClassName('lst');
/**
 * @hidden
 */
var ListView = /** @class */ (function () {
    function ListView(doc, config) {
        this.onValueChange_ = this.onValueChange_.bind(this);
        this.props_ = config.props;
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        config.viewProps.bindClassModifiers(this.element);
        var selectElem = doc.createElement('select');
        selectElem.classList.add(className('s'));
        reactive_1.bindValueMap(this.props_, 'options', function (opts) {
            dom_util_1.removeChildElements(selectElem);
            opts.forEach(function (item, index) {
                var optionElem = doc.createElement('option');
                optionElem.dataset.index = String(index);
                optionElem.textContent = item.text;
                optionElem.value = String(item.value);
                selectElem.appendChild(optionElem);
            });
        });
        config.viewProps.bindDisabled(selectElem);
        this.element.appendChild(selectElem);
        this.selectElement = selectElem;
        var markElem = doc.createElement('div');
        markElem.classList.add(className('m'));
        markElem.appendChild(dom_util_1.createSvgIconElement(doc, 'dropdown'));
        this.element.appendChild(markElem);
        config.value.emitter.on('change', this.onValueChange_);
        this.value_ = config.value;
        this.update_();
    }
    ListView.prototype.update_ = function () {
        this.selectElement.value = String(this.value_.rawValue);
    };
    ListView.prototype.onValueChange_ = function () {
        this.update_();
    };
    return ListView;
}());
exports.ListView = ListView;
