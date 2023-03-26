"use strict";
exports.__esModule = true;
exports.TabPageController = void 0;
var reactive_1 = require("../../../common/model/reactive");
var view_props_1 = require("../../../common/model/view-props");
var blade_1 = require("../../common/model/blade");
var rack_1 = require("../../rack/controller/rack");
var tab_item_1 = require("./tab-item");
var TabPageController = /** @class */ (function () {
    function TabPageController(doc, config) {
        var _this = this;
        this.onItemClick_ = this.onItemClick_.bind(this);
        this.ic_ = new tab_item_1.TabItemController(doc, {
            props: config.itemProps,
            viewProps: view_props_1.ViewProps.create()
        });
        this.ic_.emitter.on('click', this.onItemClick_);
        this.cc_ = new rack_1.RackController(doc, {
            blade: blade_1.createBlade(),
            viewProps: view_props_1.ViewProps.create()
        });
        this.props = config.props;
        reactive_1.bindValueMap(this.props, 'selected', function (selected) {
            _this.itemController.props.set('selected', selected);
            _this.contentController.viewProps.set('hidden', !selected);
        });
    }
    Object.defineProperty(TabPageController.prototype, "itemController", {
        get: function () {
            return this.ic_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TabPageController.prototype, "contentController", {
        get: function () {
            return this.cc_;
        },
        enumerable: false,
        configurable: true
    });
    TabPageController.prototype.onItemClick_ = function () {
        this.props.set('selected', true);
    };
    return TabPageController;
}());
exports.TabPageController = TabPageController;
