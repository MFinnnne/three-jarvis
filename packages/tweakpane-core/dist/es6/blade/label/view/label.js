"use strict";
exports.__esModule = true;
exports.LabelView = void 0;
var dom_util_1 = require("../../../common/dom-util");
var reactive_1 = require("../../../common/model/reactive");
var class_name_1 = require("../../../common/view/class-name");
var type_util_1 = require("../../../misc/type-util");
var className = class_name_1.ClassName('lbl');
function createLabelNode(doc, label) {
    var frag = doc.createDocumentFragment();
    var lineNodes = label.split('\n').map(function (line) {
        return doc.createTextNode(line);
    });
    lineNodes.forEach(function (lineNode, index) {
        if (index > 0) {
            frag.appendChild(doc.createElement('br'));
        }
        frag.appendChild(lineNode);
    });
    return frag;
}
/**
 * @hidden
 */
var LabelView = /** @class */ (function () {
    function LabelView(doc, config) {
        var _this = this;
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        config.viewProps.bindClassModifiers(this.element);
        var labelElem = doc.createElement('div');
        labelElem.classList.add(className('l'));
        reactive_1.bindValueMap(config.props, 'label', function (value) {
            if (type_util_1.isEmpty(value)) {
                _this.element.classList.add(className(undefined, 'nol'));
            }
            else {
                _this.element.classList.remove(className(undefined, 'nol'));
                dom_util_1.removeChildNodes(labelElem);
                labelElem.appendChild(createLabelNode(doc, value));
            }
        });
        this.element.appendChild(labelElem);
        this.labelElement = labelElem;
        var valueElem = doc.createElement('div');
        valueElem.classList.add(className('v'));
        this.element.appendChild(valueElem);
        this.valueElement = valueElem;
    }
    return LabelView;
}());
exports.LabelView = LabelView;
