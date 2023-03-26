"use strict";
exports.__esModule = true;
exports.warnMissing = exports.warnDeprecation = void 0;
function warnDeprecation(info) {
    var _a;
    console.warn([info.name + " is deprecated.", info.alternative ? "use " + info.alternative + " instead." : '', (_a = info.postscript) !== null && _a !== void 0 ? _a : ''].join(' '));
}
exports.warnDeprecation = warnDeprecation;
function warnMissing(info) {
    console.warn(["Missing '" + info.key + "' of " + info.target + " in " + info.place + ".", 'Please rebuild plugins with the latest core package.'].join(' '));
}
exports.warnMissing = warnMissing;
