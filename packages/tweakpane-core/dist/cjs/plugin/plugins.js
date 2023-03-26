"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultPluginPool = void 0;
var plugin_1 = require("../blade/button/plugin");
var plugin_2 = require("../blade/folder/plugin");
var plugin_3 = require("../blade/separator/plugin");
var plugin_4 = require("../blade/tab/plugin");
var plugin_5 = require("../input-binding/boolean/plugin");
var plugin_number_1 = require("../input-binding/color/plugin-number");
var plugin_object_1 = require("../input-binding/color/plugin-object");
var plugin_string_1 = require("../input-binding/color/plugin-string");
var plugin_6 = require("../input-binding/number/plugin");
var plugin_7 = require("../input-binding/point-2d/plugin");
var plugin_8 = require("../input-binding/point-3d/plugin");
var plugin_9 = require("../input-binding/point-4d/plugin");
var plugin_10 = require("../input-binding/string/plugin");
var plugin_11 = require("../monitor-binding/boolean/plugin");
var plugin_12 = require("../monitor-binding/number/plugin");
var plugin_13 = require("../monitor-binding/string/plugin");
var pool_1 = require("./pool");
function createDefaultPluginPool() {
    var pool = new pool_1.PluginPool();
    [
        // Inpput
        plugin_7.Point2dInputPlugin,
        plugin_8.Point3dInputPlugin,
        plugin_9.Point4dInputPlugin,
        plugin_10.StringInputPlugin,
        plugin_6.NumberInputPlugin,
        plugin_string_1.StringColorInputPlugin,
        plugin_object_1.ObjectColorInputPlugin,
        plugin_number_1.NumberColorInputPlugin,
        plugin_5.BooleanInputPlugin,
        // Monitor
        plugin_11.BooleanMonitorPlugin,
        plugin_13.StringMonitorPlugin,
        plugin_12.NumberMonitorPlugin,
        // Blade
        plugin_1.ButtonBladePlugin,
        plugin_2.FolderBladePlugin,
        plugin_3.SeparatorBladePlugin,
        plugin_4.TabBladePlugin,
    ].forEach(function (p) {
        pool.register(p);
    });
    return pool;
}
exports.createDefaultPluginPool = createDefaultPluginPool;
