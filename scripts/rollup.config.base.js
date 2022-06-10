import alias from 'rollup-plugin-alias';
import resolve from 'rollup-plugin-node-resolve';

import replace from 'rollup-plugin-replace';
import sourceMaps from 'rollup-plugin-sourcemaps';
import path from 'path';
import ts from 'rollup-plugin-typescript2';
import postcss from 'postcss';
import sass from 'rollup-plugin-scss';
import autoprefixer from 'autoprefixer';
import commonjs from '@rollup/plugin-commonjs';
import webWorkerLoader from 'rollup-plugin-web-worker-loader';
import babel from '@rollup/plugin-babel';
import { name } from '../package.json';

const getPath = (_path) => path.resolve(__dirname, _path);

const extensions = ['.js', '.ts'];
// ts
const tsPlugin = ts({
    tsconfig: getPath('../tsconfig.json'),
    extensions, // 导入本地ts配置
});

export default {
    input: 'src/index.ts',
    output: [
        {
            dir: `dist/${name}.esm.js`,
            format: 'esm',
            name,
            exports: 'auto',
            sourcemap: true,
        },
        {
            dir: `dist/${name}.cjs.js`,
            format: 'cjs',
            exports: 'auto',
            name,
            sourcemap: true,
        },
    ],
    plugins: [
        webWorkerLoader({}),
        alias({
            resolve: ['.ts'],
        }),
        babel({
            exclude: '**/node_modules/**',
            babelHelpers: 'bundled',
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        resolve(),
        sass({
            input: 'src/sass/full.scss',
            output: './dist/bundle.css',
            insert: true,
            processor: (css) =>
                postcss([autoprefixer])
                    .process(css, { from: undefined })
                    .then((result) => result.css),
        }),
        commonjs(),
        sourceMaps(),
        tsPlugin,
    ],
};
