import baseConfig from './rollup.config.base';
import command from 'rollup-plugin-command';

import { name } from '../package.json';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

export default {
    ...baseConfig,
    output: [
        {
            file: `dist/${name}.esm.js`,
            format: 'esm',
            name,
            exports: 'auto',
            sourcemap: true,
        },
        {
            file: `dist/${name}.umd.js`,
            format: 'umd',
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
        ...baseConfig.plugins,
        serve({
            open: false,
            port: 8082,
            contentBase: '',
        }),
        livereload(),
        command(`yalc push`),
    ],
};
