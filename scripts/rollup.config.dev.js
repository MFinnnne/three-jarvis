import baseConfig from './rollup.config.base';

import { name } from '../package.json';

export default {
    ...baseConfig,
    output: [
        {
            file: `dist/${name}.esm.js`,
            format: 'esm',
            name,
            sourcemap: true,
        },
        {
            file: `dist/${name}.umd.js`,
            format: 'umd',
            name,
            sourcemap: true,
        },
        {
            file: `dist/${name}.cjs.js`,
            format: 'cjs',
            name,
            sourcemap: true,
        },
    ],
    plugins: [...baseConfig.plugins],
};
