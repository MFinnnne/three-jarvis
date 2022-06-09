import baseConfig from './rollup.config.base';
import { name } from '../package.json';

export default {
    ...baseConfig,
    input: 'src/index.ts',
    output: [
        {
            file: `dist/index.esm.js`,
            format: 'esm',
            name,
            exports: 'auto',
        },
        {
            file: `dist/index.cjs.js`,
            format: 'cjs',
            exports: 'auto',
            name,
        },
    ],
    plugins: [...baseConfig.plugins],
};
