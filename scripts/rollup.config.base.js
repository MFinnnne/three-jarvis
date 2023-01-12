import alias from 'rollup-plugin-alias';
import resolve from 'rollup-plugin-node-resolve';

import replace from 'rollup-plugin-replace';
import postcss from 'postcss';
import sass from 'rollup-plugin-scss';
import autoprefixer from 'autoprefixer';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import {name} from '../package.json';
import {DEFAULT_EXTENSIONS} from '@babel/core';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: `dist/${name}.esm.js`,
            format: 'esm',
            name,
            exports: 'auto',
            sourcemap: true,
        },
        {
            file: `dist/${name}.cjs.js`,
            format: 'cjs',
            exports: 'auto',
            name,
            sourcemap: true,
        },
    ],
    plugins: [
        alias({
            resolve: ['.ts'],
        }),
        babel({
            exclude: '**/node_modules/**',
            babelHelpers: 'bundled',
            extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
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
                    .process(css, {from: undefined})
                    .then((result) => result.css),
        }),
        commonjs(),
    ],
    format: 'esm'
};
