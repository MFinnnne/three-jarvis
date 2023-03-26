"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BladeController = void 0;
var compat_1 = require("../../../common/compat");
var disposing_util_1 = require("../../../common/disposing-util");
var view_props_1 = require("../../../common/model/view-props");
var class_name_1 = require("../../../common/view/class-name");
var blade_positions_1 = require("../model/blade-positions");
var className = class_name_1.ClassName('');
var POS_TO_CLASS_NAME_MAP = {
    veryfirst: 'vfst',
    first: 'fst',
    last: 'lst',
    verylast: 'vlst',
};
var BladeController = /** @class */ (function () {
    function BladeController(config) {
        var _this = this;
        this.parent_ = null;
        this.blade = config.blade;
        this.view = config.view;
        this.viewProps = config.viewProps;
        var elem = this.view.element;
        this.blade.value('positions').emitter.on('change', function () {
            blade_positions_1.getAllBladePositions().forEach(function (pos) {
                elem.classList.remove(className(undefined, POS_TO_CLASS_NAME_MAP[pos]));
            });
            _this.blade.get('positions').forEach(function (pos) {
                elem.classList.add(className(undefined, POS_TO_CLASS_NAME_MAP[pos]));
            });
        });
        this.viewProps.handleDispose(function () {
            disposing_util_1.disposeElement(elem);
        });
    }
    Object.defineProperty(BladeController.prototype, "parent", {
        get: function () {
            return this.parent_;
        },
        set: function (parent) {
            this.parent_ = parent;
            // TODO: Remove it in the next major version
            if (!('parent' in this.viewProps.valMap_)) {
                compat_1.warnMissing({
                    key: 'parent',
                    target: view_props_1.ViewProps.name,
                    place: 'BladeController.parent',
                });
                return;
            }
            this.viewProps.set('parent', this.parent_ ? this.parent_.viewProps : null);
        },
        enumerable: false,
        configurable: true
    });
    return BladeController;
}());
exports.BladeController = BladeController;
