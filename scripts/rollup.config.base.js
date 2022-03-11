import alias from "rollup-plugin-alias";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import sourceMaps from "rollup-plugin-sourcemaps";

const getPath = _path => path.resolve(__dirname, _path);
import path from "path";
import ts from "rollup-plugin-typescript2";
import template from "rollup-plugin-templatejs";

const extensions = [
    ".js",
    ".ts"
];
// ts
const tsPlugin = ts({
    tsconfig: getPath("../tsconfig.json"),
    extensions// 导入本地ts配置
});


export default {
    input: "src/main.ts",
    plugins: [
        alias({
            resolve: [".ts"]
        }),
        replace({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
        }),
        resolve(),
        sourceMaps(),
        template({
            sTag: "<#",
            eTag: "#>",
            expression: "require(\"@templatejs/runtime\")", // 获取template的表达式，如 `window.template`
            sandbox: false, // 沙箱模式
            include: ["**/*.tmpl"], // 默认值
            exclude: "node_modules/**" // 默认值
        }),
        tsPlugin,
        commonjs({
            // non-CommonJS modules will be ignored, but you can also
            // specifically include/exclude files
            include: "node_modules/**"
        }),
        babel({
            runtimeHelpers: true,
            exclude: "node_modules/**" // only transpile our source code
        })
    ]
};
