"use strict";
exports.__esModule = true;
exports.Tab = void 0;
var values_1 = require("../../../common/model/values");
var INDEX_NOT_SELECTED = -1;
var Tab = /** @class */ (function () {
    function Tab() {
        this.onItemSelectedChange_ = this.onItemSelectedChange_.bind(this);
        this.empty = values_1.createValue(true);
        this.selectedIndex = values_1.createValue(INDEX_NOT_SELECTED);
        this.items_ = [];
    }
    Tab.prototype.add = function (item, opt_index) {
        var index = opt_index !== null && opt_index !== void 0 ? opt_index : this.items_.length;
        this.items_.splice(index, 0, item);
        item.emitter.on('change', this.onItemSelectedChange_);
        this.keepSelection_();
    };
    Tab.prototype.remove = function (item) {
        var index = this.items_.indexOf(item);
        if (index < 0) {
            return;
        }
        this.items_.splice(index, 1);
        item.emitter.off('change', this.onItemSelectedChange_);
        this.keepSelection_();
    };
    Tab.prototype.keepSelection_ = function () {
        if (this.items_.length === 0) {
            this.selectedIndex.rawValue = INDEX_NOT_SELECTED;
            this.empty.rawValue = true;
            return;
        }
        var firstSelIndex = this.items_.findIndex(function (s) { return s.rawValue; });
        if (firstSelIndex < 0) {
            this.items_.forEach(function (s, i) {
                s.rawValue = i === 0;
            });
            this.selectedIndex.rawValue = 0;
        }
        else {
            this.items_.forEach(function (s, i) {
                s.rawValue = i === firstSelIndex;
            });
            this.selectedIndex.rawValue = firstSelIndex;
        }
        this.empty.rawValue = false;
    };
    Tab.prototype.onItemSelectedChange_ = function (ev) {
        if (ev.rawValue) {
            var index_1 = this.items_.findIndex(function (s) { return s === ev.sender; });
            this.items_.forEach(function (s, i) {
                s.rawValue = i === index_1;
            });
            this.selectedIndex.rawValue = index_1;
        }
        else {
            this.keepSelection_();
        }
    };
    return Tab;
}());
exports.Tab = Tab;
