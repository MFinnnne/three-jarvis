"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseParams = exports.ParamsParsers = void 0;
var type_util_1 = require("../misc/type-util");
function parseObject(value, keyToParserMap) {
    var keys = Object.keys(keyToParserMap);
    var result = keys.reduce(function (tmp, key) {
        var _a;
        if (tmp === undefined) {
            return undefined;
        }
        var parser = keyToParserMap[key];
        var result = parser(value[key]);
        return result.succeeded
            ? __assign(__assign({}, tmp), (_a = {}, _a[key] = result.value, _a)) : undefined;
    }, {});
    return type_util_1.forceCast(result);
}
function parseArray(value, parseItem) {
    return value.reduce(function (tmp, item) {
        if (tmp === undefined) {
            return undefined;
        }
        var result = parseItem(item);
        if (!result.succeeded || result.value === undefined) {
            return undefined;
        }
        return __spreadArray(__spreadArray([], tmp), [result.value]);
    }, []);
}
function isObject(value) {
    if (value === null) {
        return false;
    }
    return typeof value === 'object';
}
function createParamsParserBuilder(parse) {
    return function (optional) { return function (v) {
        if (!optional && v === undefined) {
            return {
                succeeded: false,
                value: undefined,
            };
        }
        if (optional && v === undefined) {
            return {
                succeeded: true,
                value: undefined,
            };
        }
        var result = parse(v);
        return result !== undefined
            ? {
                succeeded: true,
                value: result,
            }
            : {
                succeeded: false,
                value: undefined,
            };
    }; };
}
function createParamsParserBuilders(optional) {
    return {
        custom: function (parse) { return createParamsParserBuilder(parse)(optional); },
        boolean: createParamsParserBuilder(function (v) { return (typeof v === 'boolean' ? v : undefined); })(optional),
        number: createParamsParserBuilder(function (v) { return (typeof v === 'number' ? v : undefined); })(optional),
        string: createParamsParserBuilder(function (v) { return (typeof v === 'string' ? v : undefined); })(optional),
        // eslint-disable-next-line @typescript-eslint/ban-types
        function: createParamsParserBuilder(function (v) {
            // eslint-disable-next-line @typescript-eslint/ban-types
            return typeof v === 'function' ? v : undefined;
        })(optional),
        constant: function (value) { return createParamsParserBuilder(function (v) { return (v === value ? value : undefined); })(optional); },
        raw: createParamsParserBuilder(function (v) { return v; })(optional),
        object: function (keyToParserMap) {
            return createParamsParserBuilder(function (v) {
                if (!isObject(v)) {
                    return undefined;
                }
                return parseObject(v, keyToParserMap);
            })(optional);
        },
        array: function (itemParser) {
            return createParamsParserBuilder(function (v) {
                if (!Array.isArray(v)) {
                    return undefined;
                }
                return parseArray(v, itemParser);
            })(optional);
        },
    };
}
exports.ParamsParsers = {
    optional: createParamsParserBuilders(true),
    required: createParamsParserBuilders(false),
};
function parseParams(value, keyToParserMap) {
    var result = exports.ParamsParsers.required.object(keyToParserMap)(value);
    return result.succeeded ? result.value : undefined;
}
exports.parseParams = parseParams;
