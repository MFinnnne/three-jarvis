"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabItemController = void 0;
var emitter_1 = require("../../../common/model/emitter");
var tab_item_1 = require("../view/tab-item");
var TabItemController = /** @class */ (function () {
    function TabItemController(doc, config) {
        this.emitter = new emitter_1.Emitter();
        this.onClick_ = this.onClick_.bind(this);
        this.props = config.props;
        this.viewProps = config.viewProps;
        this.view = new tab_item_1.TabItemView(doc, {
            props: config.props,
            viewProps: config.viewProps,
        });
        this.view.buttonElement.addEventListener('click', this.onClick_);
    }
    TabItemController.prototype.onClick_ = function () {
        this.emitter.emit('click', {
            sender: this,
        });
    };
    return TabItemController;
}());
exports.TabItemController = TabItemController;
