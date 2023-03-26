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
exports.FolderApi = void 0;
var emitter_1 = require("../../../common/model/emitter");
var rack_like_api_1 = require("../../common/api/rack-like-api");
var tp_event_1 = require("../../common/api/tp-event");
var rack_1 = require("../../rack/api/rack");
var FolderApi = /** @class */ (function (_super) {
    __extends(FolderApi, _super);
    /**
     * @hidden
     */
    function FolderApi(controller, pool) {
        var _this = _super.call(this, controller, new rack_1.RackApi(controller.rackController, pool)) || this;
        _this.emitter_ = new emitter_1.Emitter();
        _this.controller_.foldable.value('expanded').emitter.on('change', function (ev) {
            _this.emitter_.emit('fold', {
                event: new tp_event_1.TpFoldEvent(_this, ev.sender.rawValue)
            });
        });
        _this.rackApi_.on('change', function (ev) {
            _this.emitter_.emit('change', {
                event: ev
            });
        });
        _this.rackApi_.on('update', function (ev) {
            _this.emitter_.emit('update', {
                event: ev
            });
        });
        return _this;
    }
    Object.defineProperty(FolderApi.prototype, "expanded", {
        get: function () {
            return this.controller_.foldable.get('expanded');
        },
        set: function (expanded) {
            this.controller_.foldable.set('expanded', expanded);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FolderApi.prototype, "title", {
        get: function () {
            return this.controller_.props.get('title');
        },
        set: function (title) {
            this.controller_.props.set('title', title);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FolderApi.prototype, "children", {
        get: function () {
            return this.rackApi_.children;
        },
        enumerable: false,
        configurable: true
    });
    FolderApi.prototype.addInput = function (object, key, opt_params) {
        return this.rackApi_.addInput(object, key, opt_params);
    };
    FolderApi.prototype.addMonitor = function (object, key, opt_params) {
        return this.rackApi_.addMonitor(object, key, opt_params);
    };
    FolderApi.prototype.addFolder = function (params) {
        return this.rackApi_.addFolder(params);
    };
    FolderApi.prototype.addButton = function (params) {
        return this.rackApi_.addButton(params);
    };
    FolderApi.prototype.addSeparator = function (opt_params) {
        return this.rackApi_.addSeparator(opt_params);
    };
    FolderApi.prototype.addTab = function (params) {
        return this.rackApi_.addTab(params);
    };
    FolderApi.prototype.add = function (api, opt_index) {
        return this.rackApi_.add(api, opt_index);
    };
    FolderApi.prototype.remove = function (api) {
        this.rackApi_.remove(api);
    };
    FolderApi.prototype.addBlade = function (params) {
        return this.rackApi_.addBlade(params);
    };
    /**
     * Adds a global event listener. It handles all events of child inputs/monitors.
     * @param eventName The event name to listen.
     * @return The API object itself.
     */
    FolderApi.prototype.on = function (eventName, handler) {
        var bh = handler.bind(this);
        this.emitter_.on(eventName, function (ev) {
            bh(ev.event);
        });
        return this;
    };
    return FolderApi;
}(rack_like_api_1.RackLikeApi));
exports.FolderApi = FolderApi;
