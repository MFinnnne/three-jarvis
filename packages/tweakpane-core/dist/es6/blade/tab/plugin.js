"use strict";
exports.__esModule = true;
exports.TabBladePlugin = void 0;
var value_map_1 = require("../../common/model/value-map");
var params_parsers_1 = require("../../common/params-parsers");
var tab_1 = require("./api/tab");
var tab_2 = require("./controller/tab");
var tab_page_1 = require("./controller/tab-page");
exports.TabBladePlugin = {
    id: 'tab',
    type: 'blade',
    accept: function (params) {
        var p = params_parsers_1.ParamsParsers;
        var result = params_parsers_1.parseParams(params, {
            pages: p.required.array(p.required.object({ title: p.required.string })),
            view: p.required.constant('tab')
        });
        if (!result || result.pages.length === 0) {
            return null;
        }
        return { params: result };
    },
    controller: function (args) {
        var c = new tab_2.TabController(args.document, {
            blade: args.blade,
            viewProps: args.viewProps
        });
        args.params.pages.forEach(function (p) {
            var pc = new tab_page_1.TabPageController(args.document, {
                itemProps: value_map_1.ValueMap.fromObject({
                    selected: false,
                    title: p.title
                }),
                props: value_map_1.ValueMap.fromObject({
                    selected: false
                })
            });
            c.add(pc);
        });
        return c;
    },
    api: function (args) {
        if (!(args.controller instanceof tab_2.TabController)) {
            return null;
        }
        return new tab_1.TabApi(args.controller, args.pool);
    }
};
