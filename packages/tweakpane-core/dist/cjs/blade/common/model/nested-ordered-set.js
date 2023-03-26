"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestedOrderedSet = void 0;
var emitter_1 = require("../../../common/model/emitter");
var tp_error_1 = require("../../../common/tp-error");
var NestedOrderedSet = /** @class */ (function () {
    function NestedOrderedSet(extract) {
        this.emitter = new emitter_1.Emitter();
        this.items_ = [];
        this.cache_ = new Set();
        this.onSubListAdd_ = this.onSubListAdd_.bind(this);
        this.onSubListRemove_ = this.onSubListRemove_.bind(this);
        this.extract_ = extract;
    }
    Object.defineProperty(NestedOrderedSet.prototype, "items", {
        get: function () {
            return this.items_;
        },
        enumerable: false,
        configurable: true
    });
    NestedOrderedSet.prototype.allItems = function () {
        return Array.from(this.cache_);
    };
    NestedOrderedSet.prototype.find = function (callback) {
        for (var _i = 0, _a = this.allItems(); _i < _a.length; _i++) {
            var item = _a[_i];
            if (callback(item)) {
                return item;
            }
        }
        return null;
    };
    NestedOrderedSet.prototype.includes = function (item) {
        return this.cache_.has(item);
    };
    NestedOrderedSet.prototype.add = function (item, opt_index) {
        var _this = this;
        if (this.includes(item)) {
            throw tp_error_1.TpError.shouldNeverHappen();
        }
        var index = opt_index !== undefined ? opt_index : this.items_.length;
        this.items_.splice(index, 0, item);
        this.cache_.add(item);
        var subList = this.extract_(item);
        if (subList) {
            subList.emitter.on('add', this.onSubListAdd_);
            subList.emitter.on('remove', this.onSubListRemove_);
            subList.allItems().forEach(function (item) {
                _this.cache_.add(item);
            });
        }
        this.emitter.emit('add', {
            index: index,
            item: item,
            root: this,
            target: this,
        });
    };
    NestedOrderedSet.prototype.remove = function (item) {
        var index = this.items_.indexOf(item);
        if (index < 0) {
            return;
        }
        this.items_.splice(index, 1);
        this.cache_.delete(item);
        var subList = this.extract_(item);
        if (subList) {
            subList.emitter.off('add', this.onSubListAdd_);
            subList.emitter.off('remove', this.onSubListRemove_);
        }
        this.emitter.emit('remove', {
            index: index,
            item: item,
            root: this,
            target: this,
        });
    };
    NestedOrderedSet.prototype.onSubListAdd_ = function (ev) {
        this.cache_.add(ev.item);
        this.emitter.emit('add', {
            index: ev.index,
            item: ev.item,
            root: this,
            target: ev.target,
        });
    };
    NestedOrderedSet.prototype.onSubListRemove_ = function (ev) {
        this.cache_.delete(ev.item);
        this.emitter.emit('remove', {
            index: ev.index,
            item: ev.item,
            root: this,
            target: ev.target,
        });
    };
    return NestedOrderedSet;
}());
exports.NestedOrderedSet = NestedOrderedSet;
