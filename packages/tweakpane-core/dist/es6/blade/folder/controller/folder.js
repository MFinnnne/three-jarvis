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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.FolderController = void 0;
var rack_like_1 = require("../../common/controller/rack-like");
var foldable_1 = require("../../common/model/foldable");
var rack_1 = require("../../rack/controller/rack");
var folder_1 = require("../view/folder");
/**
 * @hidden
 */
var FolderController = /** @class */ (function (_super) {
    __extends(FolderController, _super);
    function FolderController(doc, config) {
        var _a;
        var _this = this;
        var foldable = foldable_1.Foldable.create((_a = config.expanded) !== null && _a !== void 0 ? _a : true);
        var rc = new rack_1.RackController(doc, {
            blade: config.blade,
            root: config.root,
            viewProps: config.viewProps
        });
        _this = _super.call(this, __assign(__assign({}, config), { rackController: rc, view: new folder_1.FolderView(doc, {
                containerElement: rc.view.element,
                foldable: foldable,
                props: config.props,
                viewName: config.root ? 'rot' : undefined,
                viewProps: config.viewProps
            }) })) || this;
        _this.onTitleClick_ = _this.onTitleClick_.bind(_this);
        _this.props = config.props;
        _this.foldable = foldable;
        foldable_1.bindFoldable(_this.foldable, _this.view.containerElement);
        // Clean up transition manually
        // Toggling `expanded` doesn't fire transition events in some cases
        // (e.g. expanding empty folder: 0px -> 0px)
        _this.rackController.rack.emitter.on('add', function () {
            _this.foldable.cleanUpTransition();
        });
        _this.rackController.rack.emitter.on('remove', function () {
            _this.foldable.cleanUpTransition();
        });
        _this.view.buttonElement.addEventListener('click', _this.onTitleClick_);
        return _this;
    }
    Object.defineProperty(FolderController.prototype, "document", {
        get: function () {
            return this.view.element.ownerDocument;
        },
        enumerable: false,
        configurable: true
    });
    FolderController.prototype.onTitleClick_ = function () {
        this.foldable.set('expanded', !this.foldable.get('expanded'));
    };
    return FolderController;
}(rack_like_1.RackLikeController));
exports.FolderController = FolderController;
