"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabPageApi = void 0;
var TabPageApi = /** @class */ (function () {
    function TabPageApi(controller, contentRackApi) {
        this.controller_ = controller;
        this.rackApi_ = contentRackApi;
    }
    Object.defineProperty(TabPageApi.prototype, "title", {
        get: function () {
            var _a;
            return (_a = this.controller_.itemController.props.get('title')) !== null && _a !== void 0 ? _a : '';
        },
        set: function (title) {
            this.controller_.itemController.props.set('title', title);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TabPageApi.prototype, "selected", {
        get: function () {
            return this.controller_.props.get('selected');
        },
        set: function (selected) {
            this.controller_.props.set('selected', selected);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TabPageApi.prototype, "children", {
        get: function () {
            return this.rackApi_.children;
        },
        enumerable: false,
        configurable: true
    });
    TabPageApi.prototype.addButton = function (params) {
        return this.rackApi_.addButton(params);
    };
    TabPageApi.prototype.addFolder = function (params) {
        return this.rackApi_.addFolder(params);
    };
    TabPageApi.prototype.addSeparator = function (opt_params) {
        return this.rackApi_.addSeparator(opt_params);
    };
    TabPageApi.prototype.addTab = function (params) {
        return this.rackApi_.addTab(params);
    };
    TabPageApi.prototype.add = function (api, opt_index) {
        this.rackApi_.add(api, opt_index);
    };
    TabPageApi.prototype.remove = function (api) {
        this.rackApi_.remove(api);
    };
    TabPageApi.prototype.addInput = function (object, key, opt_params) {
        return this.rackApi_.addInput(object, key, opt_params);
    };
    TabPageApi.prototype.addMonitor = function (object, key, opt_params) {
        return this.rackApi_.addMonitor(object, key, opt_params);
    };
    TabPageApi.prototype.addBlade = function (params) {
        return this.rackApi_.addBlade(params);
    };
    return TabPageApi;
}());
exports.TabPageApi = TabPageApi;
