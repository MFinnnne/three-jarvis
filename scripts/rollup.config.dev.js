import baseConfig from './rollup.config.base';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import path from "path";
import typescript from "@rollup/plugin-typescript";
import sourceMaps from "rollup-plugin-sourcemaps";
const getPath = (_path) => path.resolve(__dirname, _path);

const tsPlugin = typescript({
    tsconfig: getPath('../tsconfig.json'),
});

export default {
    ...baseConfig,
    plugins: [
        ...baseConfig.plugins,
        serve({
            open: false,
            port: 8088,
            contentBase: '',
        }),
        livereload(),
        nodeResolve({
            browser: true,
            mainFields: ['module', 'main'],
            preferBuiltins: true,
        }),
        sourceMaps(),
        tsPlugin,
    ],
};
