import baseConfig from './rollup.config.base';

import { name } from '../package.json';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

export default {
    ...baseConfig,
    output: [
        {
            dir: `dist/${name}.esm.js`,
            format: 'esm',
            name,
            exports: 'auto',
            sourcemap: true,
        },
        // {
        //     dir: `dist/${name}.umd.js`,
        //     format: 'amd',
        //     name,
        //     exports: 'auto',
        //     sourcemap: true,
        // },
        {
            dir: `dist/${name}.cjs.js`,
            format: 'cjs',
            exports: 'auto',
            name,
            sourcemap: true,
        }

    ],
    plugins: [
        ...baseConfig.plugins,
        serve({
            open: false,
            port: 8088,
            contentBase: '',
        }),
        livereload(),
        // command(`yalc push`),
    ],
};
