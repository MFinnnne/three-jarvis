"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueMap = void 0;
var emitter_1 = require("./emitter");
var values_1 = require("./values");
var ValueMap = /** @class */ (function () {
    function ValueMap(valueMap) {
        var _this = this;
        this.emitter = new emitter_1.Emitter();
        this.valMap_ = valueMap;
        var _loop_1 = function (key) {
            var v = this_1.valMap_[key];
            v.emitter.on('change', function () {
                _this.emitter.emit('change', {
                    key: key,
                    sender: _this,
                });
            });
        };
        var this_1 = this;
        for (var key in this.valMap_) {
            _loop_1(key);
        }
    }
    ValueMap.createCore = function (initialValue) {
        var keys = Object.keys(initialValue);
        return keys.reduce(function (o, key) {
            var _a;
            key;
            return Object.assign(o, (_a = {},
                _a[key] = values_1.createValue(initialValue[key]),
                _a));
        }, {});
    };
    ValueMap.fromObject = function (initialValue) {
        var core = this.createCore(initialValue);
        return new ValueMap(core);
    };
    ValueMap.prototype.get = function (key) {
        return this.valMap_[key].rawValue;
    };
    ValueMap.prototype.set = function (key, value) {
        this.valMap_[key].rawValue = value;
    };
    ValueMap.prototype.value = function (key) {
        return this.valMap_[key];
    };
    return ValueMap;
}());
exports.ValueMap = ValueMap;
