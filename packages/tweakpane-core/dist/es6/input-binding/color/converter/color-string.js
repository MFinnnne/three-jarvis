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
exports.__esModule = true;
exports.findColorStringifier = exports.getColorStringifier = exports.colorToObjectRgbaString = exports.colorToObjectRgbString = exports.colorToFunctionalHslaString = exports.colorToFunctionalHslString = exports.colorToFunctionalRgbaString = exports.colorToFunctionalRgbString = exports.colorToHexRgbaString = exports.colorToHexRgbString = exports.colorFromString = exports.hasAlphaComponent = exports.createColorStringParser = exports.createColorStringBindingReader = exports.CompositeColorParser = exports.detectStringColorFormat = exports.getColorNotation = void 0;
var number_1 = require("../../../common/converter/number");
var percentage_1 = require("../../../common/converter/percentage");
var number_util_1 = require("../../../common/number-util");
var color_1 = require("../model/color");
var color_model_1 = require("../model/color-model");
function equalsStringColorFormat(f1, f2) {
    return f1.alpha === f2.alpha && f1.mode === f2.mode && f1.notation === f2.notation && f1.type === f2.type;
}
function parseCssNumberOrPercentage(text, maxValue) {
    var m = text.match(/^(.+)%$/);
    if (!m) {
        return Math.min(parseFloat(text), maxValue);
    }
    return Math.min(parseFloat(m[1]) * 0.01 * maxValue, maxValue);
}
var ANGLE_TO_DEG_MAP = {
    deg: function (angle) { return angle; },
    grad: function (angle) { return (angle * 360) / 400; },
    rad: function (angle) { return (angle * 360) / (2 * Math.PI); },
    turn: function (angle) { return angle * 360; }
};
function parseCssNumberOrAngle(text) {
    var m = text.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);
    if (!m) {
        return parseFloat(text);
    }
    var angle = parseFloat(m[1]);
    var unit = m[2];
    return ANGLE_TO_DEG_MAP[unit](angle);
}
function parseFunctionalRgbColorComponents(text) {
    var m = text.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
    if (!m) {
        return null;
    }
    var comps = [parseCssNumberOrPercentage(m[1], 255), parseCssNumberOrPercentage(m[2], 255), parseCssNumberOrPercentage(m[3], 255)];
    if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) {
        return null;
    }
    return comps;
}
function createFunctionalRgbColorParser(type) {
    return function (text) {
        var comps = parseFunctionalRgbColorComponents(text);
        return comps ? new color_1.Color(comps, 'rgb', type) : null;
    };
}
function parseFunctionalRgbaColorComponents(text) {
    var m = text.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
    if (!m) {
        return null;
    }
    var comps = [parseCssNumberOrPercentage(m[1], 255), parseCssNumberOrPercentage(m[2], 255), parseCssNumberOrPercentage(m[3], 255), parseCssNumberOrPercentage(m[4], 1)];
    if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2]) || isNaN(comps[3])) {
        return null;
    }
    return comps;
}
function createFunctionalRgbaColorParser(type) {
    return function (text) {
        var comps = parseFunctionalRgbaColorComponents(text);
        return comps ? new color_1.Color(comps, 'rgb', type) : null;
    };
}
function parseHslColorComponents(text) {
    var m = text.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
    if (!m) {
        return null;
    }
    var comps = [parseCssNumberOrAngle(m[1]), parseCssNumberOrPercentage(m[2], 100), parseCssNumberOrPercentage(m[3], 100)];
    if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) {
        return null;
    }
    return comps;
}
function createHslColorParser(type) {
    return function (text) {
        var comps = parseHslColorComponents(text);
        return comps ? new color_1.Color(comps, 'hsl', type) : null;
    };
}
function parseHslaColorComponents(text) {
    var m = text.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
    if (!m) {
        return null;
    }
    var comps = [parseCssNumberOrAngle(m[1]), parseCssNumberOrPercentage(m[2], 100), parseCssNumberOrPercentage(m[3], 100), parseCssNumberOrPercentage(m[4], 1)];
    if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2]) || isNaN(comps[3])) {
        return null;
    }
    return comps;
}
function createHslaColorParser(type) {
    return function (text) {
        var comps = parseHslaColorComponents(text);
        return comps ? new color_1.Color(comps, 'hsl', type) : null;
    };
}
function parseHexRgbColorComponents(text) {
    var mRgb = text.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
    if (mRgb) {
        return [parseInt(mRgb[1] + mRgb[1], 16), parseInt(mRgb[2] + mRgb[2], 16), parseInt(mRgb[3] + mRgb[3], 16)];
    }
    var mRrggbb = text.match(/^(?:#|0x)([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
    if (mRrggbb) {
        return [parseInt(mRrggbb[1], 16), parseInt(mRrggbb[2], 16), parseInt(mRrggbb[3], 16)];
    }
    return null;
}
function parseHexRgbColor(text) {
    var comps = parseHexRgbColorComponents(text);
    return comps ? new color_1.Color(comps, 'rgb', 'int') : null;
}
function parseHexRgbaColorComponents(text) {
    var mRgb = text.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
    if (mRgb) {
        return [parseInt(mRgb[1] + mRgb[1], 16), parseInt(mRgb[2] + mRgb[2], 16), parseInt(mRgb[3] + mRgb[3], 16), number_util_1.mapRange(parseInt(mRgb[4] + mRgb[4], 16), 0, 255, 0, 1)];
    }
    var mRrggbb = text.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
    if (mRrggbb) {
        return [parseInt(mRrggbb[1], 16), parseInt(mRrggbb[2], 16), parseInt(mRrggbb[3], 16), number_util_1.mapRange(parseInt(mRrggbb[4], 16), 0, 255, 0, 1)];
    }
    return null;
}
function parseHexRgbaColor(text) {
    var comps = parseHexRgbaColorComponents(text);
    return comps ? new color_1.Color(comps, 'rgb', 'int') : null;
}
function parseObjectRgbColorComponents(text) {
    var m = text.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);
    if (!m) {
        return null;
    }
    var comps = [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])];
    if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) {
        return null;
    }
    return comps;
}
function createObjectRgbColorParser(type) {
    return function (text) {
        var comps = parseObjectRgbColorComponents(text);
        return comps ? new color_1.Color(comps, 'rgb', type) : null;
    };
}
function parseObjectRgbaColorComponents(text) {
    var m = text.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*a\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);
    if (!m) {
        return null;
    }
    var comps = [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3]), parseFloat(m[4])];
    if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2]) || isNaN(comps[3])) {
        return null;
    }
    return comps;
}
function createObjectRgbaColorParser(type) {
    return function (text) {
        var comps = parseObjectRgbaColorComponents(text);
        return comps ? new color_1.Color(comps, 'rgb', type) : null;
    };
}
var NOTATION_TO_PARSER_MAP = {
    'func.rgb': createFunctionalRgbColorParser('int'),
    'func.rgba': createFunctionalRgbaColorParser('int'),
    'func.hsl': createHslColorParser('int'),
    'func.hsla': createHslaColorParser('int'),
    'hex.rgb': parseHexRgbColor,
    'hex.rgba': parseHexRgbaColor
};
/**
 * @deprecated
 * @hidden
 */
function getColorNotation(text) {
    var notations = Object.keys(NOTATION_TO_PARSER_MAP);
    return notations.reduce(function (result, notation) {
        if (result) {
            return result;
        }
        var subparser = NOTATION_TO_PARSER_MAP[notation];
        return subparser(text) ? notation : null;
    }, null);
}
exports.getColorNotation = getColorNotation;
var PARSER_AND_RESULT = [
    {
        parser: parseHexRgbColorComponents,
        result: {
            alpha: false,
            mode: 'rgb',
            notation: 'hex'
        }
    },
    {
        parser: parseHexRgbaColorComponents,
        result: {
            alpha: true,
            mode: 'rgb',
            notation: 'hex'
        }
    },
    {
        parser: parseFunctionalRgbColorComponents,
        result: {
            alpha: false,
            mode: 'rgb',
            notation: 'func'
        }
    },
    {
        parser: parseFunctionalRgbaColorComponents,
        result: {
            alpha: true,
            mode: 'rgb',
            notation: 'func'
        }
    },
    {
        parser: parseHslColorComponents,
        result: {
            alpha: false,
            mode: 'hsl',
            notation: 'func'
        }
    },
    {
        parser: parseHslaColorComponents,
        result: {
            alpha: true,
            mode: 'hsl',
            notation: 'func'
        }
    },
    {
        parser: parseObjectRgbColorComponents,
        result: {
            alpha: false,
            mode: 'rgb',
            notation: 'object'
        }
    },
    {
        parser: parseObjectRgbaColorComponents,
        result: {
            alpha: true,
            mode: 'rgb',
            notation: 'object'
        }
    },
];
function detectStringColor(text) {
    return PARSER_AND_RESULT.reduce(function (prev, _a) {
        var parser = _a.parser, detection = _a.result;
        if (prev) {
            return prev;
        }
        return parser(text) ? detection : null;
    }, null);
}
function detectStringColorFormat(text, type) {
    if (type === void 0) { type = 'int'; }
    var r = detectStringColor(text);
    if (!r) {
        return null;
    }
    if (r.notation === 'hex' && type !== 'float') {
        return __assign(__assign({}, r), { type: 'int' });
    }
    if (r.notation === 'func') {
        return __assign(__assign({}, r), { type: type });
    }
    return null;
}
exports.detectStringColorFormat = detectStringColorFormat;
/**
 * @deprecated Use createColorStringParser instead.
 * @hidden
 */
var CompositeColorParser = function (text) {
    var notation = getColorNotation(text);
    return notation ? NOTATION_TO_PARSER_MAP[notation](text) : null;
};
exports.CompositeColorParser = CompositeColorParser;
var TYPE_TO_PARSERS = {
    int: [
        parseHexRgbColor,
        parseHexRgbaColor,
        createFunctionalRgbColorParser('int'),
        createFunctionalRgbaColorParser('int'),
        createHslColorParser('int'),
        createHslaColorParser('int'),
        createObjectRgbColorParser('int'),
        createObjectRgbaColorParser('int'),
    ],
    float: [
        createFunctionalRgbColorParser('float'),
        createFunctionalRgbaColorParser('float'),
        createHslColorParser('float'),
        createHslaColorParser('float'),
        createObjectRgbColorParser('float'),
        createObjectRgbaColorParser('float'),
    ]
};
function createColorStringBindingReader(type) {
    var parsers = TYPE_TO_PARSERS[type];
    return function (value) {
        if (typeof value !== 'string') {
            return color_1.Color.black(type);
        }
        var result = parsers.reduce(function (prev, parser) {
            if (prev) {
                return prev;
            }
            return parser(value);
        }, null);
        return result !== null && result !== void 0 ? result : color_1.Color.black(type);
    };
}
exports.createColorStringBindingReader = createColorStringBindingReader;
function createColorStringParser(type) {
    var parsers = TYPE_TO_PARSERS[type];
    return function (value) {
        return parsers.reduce(function (prev, parser) {
            if (prev) {
                return prev;
            }
            return parser(value);
        }, null);
    };
}
exports.createColorStringParser = createColorStringParser;
/**
 * @deprecated
 * @hidden
 */
function hasAlphaComponent(notation) {
    return notation === 'func.hsla' || notation === 'func.rgba' || notation === 'hex.rgba';
}
exports.hasAlphaComponent = hasAlphaComponent;
/**
 * @deprecated
 * @hidden
 */
function colorFromString(value) {
    if (typeof value === 'string') {
        var cv = exports.CompositeColorParser(value);
        if (cv) {
            return cv;
        }
    }
    return color_1.Color.black();
}
exports.colorFromString = colorFromString;
function zerofill(comp) {
    var hex = number_util_1.constrainRange(Math.floor(comp), 0, 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}
/**
 * @hidden
 */
function colorToHexRgbString(value, prefix) {
    if (prefix === void 0) { prefix = '#'; }
    var hexes = color_model_1.removeAlphaComponent(value.getComponents('rgb')).map(zerofill).join('');
    return "" + prefix + hexes;
}
exports.colorToHexRgbString = colorToHexRgbString;
/**
 * @hidden
 */
function colorToHexRgbaString(value, prefix) {
    if (prefix === void 0) { prefix = '#'; }
    var rgbaComps = value.getComponents('rgb');
    var hexes = [rgbaComps[0], rgbaComps[1], rgbaComps[2], rgbaComps[3] * 255].map(zerofill).join('');
    return "" + prefix + hexes;
}
exports.colorToHexRgbaString = colorToHexRgbaString;
// TODO: Make type required in the next major version
/**
 * @hidden
 */
function colorToFunctionalRgbString(value, opt_type) {
    var formatter = number_1.createNumberFormatter(opt_type === 'float' ? 2 : 0);
    var comps = color_model_1.removeAlphaComponent(value.getComponents('rgb', opt_type)).map(function (comp) { return formatter(comp); });
    return "rgb(" + comps.join(', ') + ")";
}
exports.colorToFunctionalRgbString = colorToFunctionalRgbString;
function createFunctionalRgbColorFormatter(type) {
    return function (value) {
        return colorToFunctionalRgbString(value, type);
    };
}
// TODO: Make type required in the next major version
/**
 * @hidden
 */
function colorToFunctionalRgbaString(value, opt_type) {
    var aFormatter = number_1.createNumberFormatter(2);
    var rgbFormatter = number_1.createNumberFormatter(opt_type === 'float' ? 2 : 0);
    var comps = value.getComponents('rgb', opt_type).map(function (comp, index) {
        var formatter = index === 3 ? aFormatter : rgbFormatter;
        return formatter(comp);
    });
    return "rgba(" + comps.join(', ') + ")";
}
exports.colorToFunctionalRgbaString = colorToFunctionalRgbaString;
function createFunctionalRgbaColorFormatter(type) {
    return function (value) {
        return colorToFunctionalRgbaString(value, type);
    };
}
/**
 * @hidden
 */
function colorToFunctionalHslString(value) {
    var formatters = [number_1.createNumberFormatter(0), percentage_1.formatPercentage, percentage_1.formatPercentage];
    var comps = color_model_1.removeAlphaComponent(value.getComponents('hsl')).map(function (comp, index) { return formatters[index](comp); });
    return "hsl(" + comps.join(', ') + ")";
}
exports.colorToFunctionalHslString = colorToFunctionalHslString;
/**
 * @hidden
 */
function colorToFunctionalHslaString(value) {
    var formatters = [number_1.createNumberFormatter(0), percentage_1.formatPercentage, percentage_1.formatPercentage, number_1.createNumberFormatter(2)];
    var comps = value.getComponents('hsl').map(function (comp, index) { return formatters[index](comp); });
    return "hsla(" + comps.join(', ') + ")";
}
exports.colorToFunctionalHslaString = colorToFunctionalHslaString;
/**
 * @hidden
 */
function colorToObjectRgbString(value, type) {
    var formatter = number_1.createNumberFormatter(type === 'float' ? 2 : 0);
    var names = ['r', 'g', 'b'];
    var comps = color_model_1.removeAlphaComponent(value.getComponents('rgb', type)).map(function (comp, index) { return names[index] + ": " + formatter(comp); });
    return "{" + comps.join(', ') + "}";
}
exports.colorToObjectRgbString = colorToObjectRgbString;
function createObjectRgbColorFormatter(type) {
    return function (value) { return colorToObjectRgbString(value, type); };
}
/**
 * @hidden
 */
function colorToObjectRgbaString(value, type) {
    var aFormatter = number_1.createNumberFormatter(2);
    var rgbFormatter = number_1.createNumberFormatter(type === 'float' ? 2 : 0);
    var names = ['r', 'g', 'b', 'a'];
    var comps = value.getComponents('rgb', type).map(function (comp, index) {
        var formatter = index === 3 ? aFormatter : rgbFormatter;
        return names[index] + ": " + formatter(comp);
    });
    return "{" + comps.join(', ') + "}";
}
exports.colorToObjectRgbaString = colorToObjectRgbaString;
function createObjectRgbaColorFormatter(type) {
    return function (value) { return colorToObjectRgbaString(value, type); };
}
var NOTATION_TO_STRINGIFIER_MAP = {
    'func.hsl': colorToFunctionalHslString,
    'func.hsla': colorToFunctionalHslaString,
    'func.rgb': colorToFunctionalRgbString,
    'func.rgba': colorToFunctionalRgbaString,
    'hex.rgb': colorToHexRgbString,
    'hex.rgba': colorToHexRgbaString
};
/**
 * @deprecated
 */
function getColorStringifier(notation) {
    return NOTATION_TO_STRINGIFIER_MAP[notation];
}
exports.getColorStringifier = getColorStringifier;
var FORMAT_AND_STRINGIFIERS = __spreadArray([
    {
        format: {
            alpha: false,
            mode: 'rgb',
            notation: 'hex',
            type: 'int'
        },
        stringifier: colorToHexRgbString
    },
    {
        format: {
            alpha: true,
            mode: 'rgb',
            notation: 'hex',
            type: 'int'
        },
        stringifier: colorToHexRgbaString
    },
    {
        format: {
            alpha: false,
            mode: 'hsl',
            notation: 'func',
            type: 'int'
        },
        stringifier: colorToFunctionalHslString
    },
    {
        format: {
            alpha: true,
            mode: 'hsl',
            notation: 'func',
            type: 'int'
        },
        stringifier: colorToFunctionalHslaString
    }
], ['int', 'float'].reduce(function (prev, type) {
    return __spreadArray(__spreadArray([], prev), [
        {
            format: {
                alpha: false,
                mode: 'rgb',
                notation: 'func',
                type: type
            },
            stringifier: createFunctionalRgbColorFormatter(type)
        },
        {
            format: {
                alpha: true,
                mode: 'rgb',
                notation: 'func',
                type: type
            },
            stringifier: createFunctionalRgbaColorFormatter(type)
        },
        {
            format: {
                alpha: false,
                mode: 'rgb',
                notation: 'object',
                type: type
            },
            stringifier: createObjectRgbColorFormatter(type)
        },
        {
            format: {
                alpha: true,
                mode: 'rgb',
                notation: 'object',
                type: type
            },
            stringifier: createObjectRgbaColorFormatter(type)
        },
    ]);
}, []));
function findColorStringifier(format) {
    return FORMAT_AND_STRINGIFIERS.reduce(function (prev, fas) {
        if (prev) {
            return prev;
        }
        return equalsStringColorFormat(fas.format, format) ? fas.stringifier : null;
    }, null);
}
exports.findColorStringifier = findColorStringifier;
