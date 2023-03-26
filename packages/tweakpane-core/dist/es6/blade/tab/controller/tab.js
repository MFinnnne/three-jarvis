"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.TabController = void 0;
var dom_util_1 = require("../../../common/dom-util");
var rack_like_1 = require("../../common/controller/rack-like");
var nested_ordered_set_1 = require("../../common/model/nested-ordered-set");
var rack_1 = require("../../rack/controller/rack");
var tab_1 = require("../model/tab");
var tab_2 = require("../view/tab");
var TabController = /** @class */ (function (_super) {
    __extends(TabController, _super);
    function TabController(doc, config) {
        var _this = this;
        var cr = new rack_1.RackController(doc, {
            blade: config.blade,
            viewProps: config.viewProps
        });
        var tab = new tab_1.Tab();
        _this = _super.call(this, {
            blade: config.blade,
            rackController: cr,
            view: new tab_2.TabView(doc, {
                contentsElement: cr.view.element,
                empty: tab.empty,
                viewProps: config.viewProps
            })
        }) || this;
        _this.onPageAdd_ = _this.onPageAdd_.bind(_this);
        _this.onPageRemove_ = _this.onPageRemove_.bind(_this);
        _this.pageSet_ = new nested_ordered_set_1.NestedOrderedSet(function () { return null; });
        _this.pageSet_.emitter.on('add', _this.onPageAdd_);
        _this.pageSet_.emitter.on('remove', _this.onPageRemove_);
        _this.tab = tab;
        return _this;
    }
    Object.defineProperty(TabController.prototype, "pageSet", {
        get: function () {
            return this.pageSet_;
        },
        enumerable: false,
        configurable: true
    });
    TabController.prototype.add = function (pc, opt_index) {
        this.pageSet_.add(pc, opt_index);
    };
    TabController.prototype.remove = function (index) {
        this.pageSet_.remove(this.pageSet_.items[index]);
    };
    TabController.prototype.onPageAdd_ = function (ev) {
        var pc = ev.item;
        dom_util_1.insertElementAt(this.view.itemsElement, pc.itemController.view.element, ev.index);
        pc.itemController.viewProps.set('parent', this.viewProps);
        this.rackController.rack.add(pc.contentController, ev.index);
        this.tab.add(pc.props.value('selected'));
    };
    TabController.prototype.onPageRemove_ = function (ev) {
        var pc = ev.item;
        dom_util_1.removeElement(pc.itemController.view.element);
        pc.itemController.viewProps.set('parent', null);
        this.rackController.rack.remove(pc.contentController);
        this.tab.remove(pc.props.value('selected'));
    };
    return TabController;
}(rack_like_1.RackLikeController));
exports.TabController = TabController;
