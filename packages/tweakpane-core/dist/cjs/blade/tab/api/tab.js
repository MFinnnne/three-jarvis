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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabApi = void 0;
var emitter_1 = require("../../../common/model/emitter");
var value_map_1 = require("../../../common/model/value-map");
var tp_error_1 = require("../../../common/tp-error");
var rack_like_api_1 = require("../../common/api/rack-like-api");
var tp_event_1 = require("../../common/api/tp-event");
var rack_1 = require("../../rack/api/rack");
var tab_page_1 = require("../controller/tab-page");
var tab_page_2 = require("./tab-page");
var TabApi = /** @class */ (function (_super) {
    __extends(TabApi, _super);
    /**
     * @hidden
     */
    function TabApi(controller, pool) {
        var _this = _super.call(this, controller, new rack_1.RackApi(controller.rackController, pool)) || this;
        _this.onPageAdd_ = _this.onPageAdd_.bind(_this);
        _this.onPageRemove_ = _this.onPageRemove_.bind(_this);
        _this.onSelect_ = _this.onSelect_.bind(_this);
        _this.emitter_ = new emitter_1.Emitter();
        _this.pageApiMap_ = new Map();
        _this.rackApi_.on('change', function (ev) {
            _this.emitter_.emit('change', {
                event: ev,
            });
        });
        _this.rackApi_.on('update', function (ev) {
            _this.emitter_.emit('update', {
                event: ev,
            });
        });
        _this.controller_.tab.selectedIndex.emitter.on('change', _this.onSelect_);
        _this.controller_.pageSet.emitter.on('add', _this.onPageAdd_);
        _this.controller_.pageSet.emitter.on('remove', _this.onPageRemove_);
        _this.controller_.pageSet.items.forEach(function (pc) {
            _this.setUpPageApi_(pc);
        });
        return _this;
    }
    Object.defineProperty(TabApi.prototype, "pages", {
        get: function () {
            var _this = this;
            return this.controller_.pageSet.items.map(function (pc) {
                var api = _this.pageApiMap_.get(pc);
                /* istanbul ignore next */
                if (!api) {
                    throw tp_error_1.TpError.shouldNeverHappen();
                }
                return api;
            });
        },
        enumerable: false,
        configurable: true
    });
    TabApi.prototype.addPage = function (params) {
        var doc = this.controller_.view.element.ownerDocument;
        var pc = new tab_page_1.TabPageController(doc, {
            itemProps: value_map_1.ValueMap.fromObject({
                selected: false,
                title: params.title,
            }),
            props: value_map_1.ValueMap.fromObject({
                selected: false,
            }),
        });
        this.controller_.add(pc, params.index);
        var api = this.pageApiMap_.get(pc);
        /* istanbul ignore next */
        if (!api) {
            throw tp_error_1.TpError.shouldNeverHappen();
        }
        return api;
    };
    TabApi.prototype.removePage = function (index) {
        this.controller_.remove(index);
    };
    TabApi.prototype.on = function (eventName, handler) {
        var bh = handler.bind(this);
        this.emitter_.on(eventName, function (ev) {
            bh(ev.event);
        });
        return this;
    };
    TabApi.prototype.setUpPageApi_ = function (pc) {
        var rackApi = this.rackApi_['apiSet_'].find(function (api) { return api.controller_ === pc.contentController; });
        if (!rackApi) {
            throw tp_error_1.TpError.shouldNeverHappen();
        }
        var api = new tab_page_2.TabPageApi(pc, rackApi);
        this.pageApiMap_.set(pc, api);
    };
    TabApi.prototype.onPageAdd_ = function (ev) {
        this.setUpPageApi_(ev.item);
    };
    TabApi.prototype.onPageRemove_ = function (ev) {
        var api = this.pageApiMap_.get(ev.item);
        /* istanbul ignore next */
        if (!api) {
            throw tp_error_1.TpError.shouldNeverHappen();
        }
        this.pageApiMap_.delete(ev.item);
    };
    TabApi.prototype.onSelect_ = function (ev) {
        this.emitter_.emit('select', {
            event: new tp_event_1.TpTabSelectEvent(this, ev.rawValue),
        });
    };
    return TabApi;
}(rack_like_api_1.RackLikeApi));
exports.TabApi = TabApi;
