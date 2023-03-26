"use strict";
exports.__esModule = true;
exports.readNumericLiteral = exports.readWhitespace = void 0;
function combineReader(parsers) {
    return function (text, cursor) {
        for (var i = 0; i < parsers.length; i++) {
            var result = parsers[i](text, cursor);
            if (result !== '') {
                return result;
            }
        }
        return '';
    };
}
function readWhitespace(text, cursor) {
    var _a;
    var m = text.substr(cursor).match(/^\s+/);
    return (_a = (m && m[0])) !== null && _a !== void 0 ? _a : '';
}
exports.readWhitespace = readWhitespace;
function readNonZeroDigit(text, cursor) {
    var ch = text.substr(cursor, 1);
    return ch.match(/^[1-9]$/) ? ch : '';
}
function readDecimalDigits(text, cursor) {
    var _a;
    var m = text.substr(cursor).match(/^[0-9]+/);
    return (_a = (m && m[0])) !== null && _a !== void 0 ? _a : '';
}
function readSignedInteger(text, cursor) {
    var ds = readDecimalDigits(text, cursor);
    if (ds !== '') {
        return ds;
    }
    var sign = text.substr(cursor, 1);
    cursor += 1;
    if (sign !== '-' && sign !== '+') {
        return '';
    }
    var sds = readDecimalDigits(text, cursor);
    if (sds === '') {
        return '';
    }
    return sign + sds;
}
function readExponentPart(text, cursor) {
    var result = [];
    var e = text.substr(cursor, 1);
    cursor += 1;
    if (e.toLowerCase() !== 'e') {
        return '';
    }
    result.push(e);
    var si = readSignedInteger(text, cursor);
    if (si === '') {
        return '';
    }
    return e + si;
}
function readDecimalIntegerLiteral(text, cursor) {
    var ch = text.substr(cursor, 1);
    if (ch === '0') {
        return ch;
    }
    var nzd = readNonZeroDigit(text, cursor);
    cursor += nzd.length;
    if (nzd === '') {
        return '';
    }
    return nzd + readDecimalDigits(text, cursor);
}
function readDecimalLiteral1(text, cursor) {
    var dil = readDecimalIntegerLiteral(text, cursor);
    cursor += dil.length;
    if (dil === '') {
        return '';
    }
    var dot = text.substr(cursor, 1);
    cursor += dot.length;
    if (dot !== '.') {
        return '';
    }
    var dds = readDecimalDigits(text, cursor);
    cursor += dds.length;
    return dil + dot + dds + readExponentPart(text, cursor);
}
function readDecimalLiteral2(text, cursor) {
    var dot = text.substr(cursor, 1);
    cursor += dot.length;
    if (dot !== '.') {
        return '';
    }
    var dds = readDecimalDigits(text, cursor);
    cursor += dds.length;
    if (dds === '') {
        return '';
    }
    return dot + dds + readExponentPart(text, cursor);
}
function readDecimalLiteral3(text, cursor) {
    var dil = readDecimalIntegerLiteral(text, cursor);
    cursor += dil.length;
    if (dil === '') {
        return '';
    }
    return dil + readExponentPart(text, cursor);
}
var readDecimalLiteral = combineReader([readDecimalLiteral1, readDecimalLiteral2, readDecimalLiteral3]);
function parseBinaryDigits(text, cursor) {
    var _a;
    var m = text.substr(cursor).match(/^[01]+/);
    return (_a = (m && m[0])) !== null && _a !== void 0 ? _a : '';
}
function readBinaryIntegerLiteral(text, cursor) {
    var prefix = text.substr(cursor, 2);
    cursor += prefix.length;
    if (prefix.toLowerCase() !== '0b') {
        return '';
    }
    var bds = parseBinaryDigits(text, cursor);
    if (bds === '') {
        return '';
    }
    return prefix + bds;
}
function readOctalDigits(text, cursor) {
    var _a;
    var m = text.substr(cursor).match(/^[0-7]+/);
    return (_a = (m && m[0])) !== null && _a !== void 0 ? _a : '';
}
function readOctalIntegerLiteral(text, cursor) {
    var prefix = text.substr(cursor, 2);
    cursor += prefix.length;
    if (prefix.toLowerCase() !== '0o') {
        return '';
    }
    var ods = readOctalDigits(text, cursor);
    if (ods === '') {
        return '';
    }
    return prefix + ods;
}
function readHexDigits(text, cursor) {
    var _a;
    var m = text.substr(cursor).match(/^[0-9a-f]+/i);
    return (_a = (m && m[0])) !== null && _a !== void 0 ? _a : '';
}
function readHexIntegerLiteral(text, cursor) {
    var prefix = text.substr(cursor, 2);
    cursor += prefix.length;
    if (prefix.toLowerCase() !== '0x') {
        return '';
    }
    var hds = readHexDigits(text, cursor);
    if (hds === '') {
        return '';
    }
    return prefix + hds;
}
var readNonDecimalIntegerLiteral = combineReader([readBinaryIntegerLiteral, readOctalIntegerLiteral, readHexIntegerLiteral]);
exports.readNumericLiteral = combineReader([readNonDecimalIntegerLiteral, readDecimalLiteral]);
