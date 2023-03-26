"use strict";
exports.__esModule = true;
exports.ListController = void 0;
var type_util_1 = require("../../misc/type-util");
var list_1 = require("../view/list");
var ListController = /** @class */ (function () {
    function ListController(doc, config) {
        this.onSelectChange_ = this.onSelectChange_.bind(this);
        this.props = config.props;
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.view = new list_1.ListView(doc, {
            props: this.props,
            value: this.value,
            viewProps: this.viewProps
        });
        this.view.selectElement.addEventListener('change', this.onSelectChange_);
    }
    ListController.prototype.onSelectChange_ = function (e) {
        var selectElem = type_util_1.forceCast(e.currentTarget);
        var optElem = selectElem.selectedOptions.item(0);
        if (!optElem) {
            return;
        }
        var itemIndex = Number(optElem.dataset.index);
        this.value.rawValue = this.props.get('options')[itemIndex].value;
    };
    return ListController;
}());
exports.ListController = ListController;
