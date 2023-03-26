"use strict";
exports.__esModule = true;
exports.FolderBladePlugin = void 0;
var value_map_1 = require("../../common/model/value-map");
var params_parsers_1 = require("../../common/params-parsers");
var folder_1 = require("./api/folder");
var folder_2 = require("./controller/folder");
exports.FolderBladePlugin = {
    id: 'folder',
    type: 'blade',
    accept: function (params) {
        var p = params_parsers_1.ParamsParsers;
        var result = params_parsers_1.parseParams(params, {
            title: p.required.string,
            view: p.required.constant('folder'),
            expanded: p.optional.boolean
        });
        return result ? { params: result } : null;
    },
    controller: function (args) {
        return new folder_2.FolderController(args.document, {
            blade: args.blade,
            expanded: args.params.expanded,
            props: value_map_1.ValueMap.fromObject({
                title: args.params.title
            }),
            viewProps: args.viewProps
        });
    },
    api: function (args) {
        if (!(args.controller instanceof folder_2.FolderController)) {
            return null;
        }
        return new folder_1.FolderApi(args.controller, args.pool);
    }
};
