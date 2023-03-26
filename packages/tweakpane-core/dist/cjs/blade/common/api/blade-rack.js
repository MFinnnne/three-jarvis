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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTabAsBlade = exports.addSeparatorAsBlade = exports.addFolderAsBlade = exports.addButtonAsBlade = void 0;
function addButtonAsBlade(api, params) {
    return api.addBlade(__assign(__assign({}, params), { view: 'button' }));
}
exports.addButtonAsBlade = addButtonAsBlade;
function addFolderAsBlade(api, params) {
    return api.addBlade(__assign(__assign({}, params), { view: 'folder' }));
}
exports.addFolderAsBlade = addFolderAsBlade;
function addSeparatorAsBlade(api, opt_params) {
    var params = opt_params !== null && opt_params !== void 0 ? opt_params : {};
    return api.addBlade(__assign(__assign({}, params), { view: 'separator' }));
}
exports.addSeparatorAsBlade = addSeparatorAsBlade;
function addTabAsBlade(api, params) {
    return api.addBlade(__assign(__assign({}, params), { view: 'tab' }));
}
exports.addTabAsBlade = addTabAsBlade;
