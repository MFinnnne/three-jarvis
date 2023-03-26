"use strict";
exports.__esModule = true;
exports.FolderView = void 0;
var reactive_1 = require("../../../common/model/reactive");
var class_name_1 = require("../../../common/view/class-name");
var reactive_2 = require("../../../common/view/reactive");
var type_util_1 = require("../../../misc/type-util");
var blade_container_1 = require("../../common/view/blade-container");
/**
 * @hidden
 */
var FolderView = /** @class */ (function () {
    function FolderView(doc, config) {
        var _this = this;
        var _a;
        this.className_ = class_name_1.ClassName((_a = config.viewName) !== null && _a !== void 0 ? _a : 'fld');
        this.element = doc.createElement('div');
        this.element.classList.add(this.className_(), blade_container_1.bladeContainerClassName());
        config.viewProps.bindClassModifiers(this.element);
        this.foldable_ = config.foldable;
        this.foldable_.bindExpandedClass(this.element, this.className_(undefined, 'expanded'));
        reactive_1.bindValueMap(this.foldable_, 'completed', reactive_2.valueToClassName(this.element, this.className_(undefined, 'cpl')));
        var buttonElem = doc.createElement('button');
        buttonElem.classList.add(this.className_('b'));
        reactive_1.bindValueMap(config.props, 'title', function (title) {
            if (type_util_1.isEmpty(title)) {
                _this.element.classList.add(_this.className_(undefined, 'not'));
            }
            else {
                _this.element.classList.remove(_this.className_(undefined, 'not'));
            }
        });
        config.viewProps.bindDisabled(buttonElem);
        this.element.appendChild(buttonElem);
        this.buttonElement = buttonElem;
        var indentElem = doc.createElement('div');
        indentElem.classList.add(this.className_('i'));
        this.element.appendChild(indentElem);
        var titleElem = doc.createElement('div');
        titleElem.classList.add(this.className_('t'));
        reactive_2.bindValueToTextContent(config.props.value('title'), titleElem);
        this.buttonElement.appendChild(titleElem);
        this.titleElement = titleElem;
        var markElem = doc.createElement('div');
        markElem.classList.add(this.className_('m'));
        this.buttonElement.appendChild(markElem);
        var containerElem = config.containerElement;
        containerElem.classList.add(this.className_('c'));
        this.element.appendChild(containerElem);
        this.containerElement = containerElem;
    }
    return FolderView;
}());
exports.FolderView = FolderView;
