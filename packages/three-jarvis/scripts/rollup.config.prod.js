import baseConfig from './rollup.config.base';
import { name } from '../package.json';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

export default {
    ...baseConfig,
    input: 'src/index.ts',
    output: [
        {
            file: `dist/${name}.esm.js`,
            format: 'esm',
            name,
            exports: 'auto',
            sourcemap: false,
        },
        {
            file: `dist/${name}.cjs.js`,
            format: 'cjs',
            exports: 'auto',
            name,
            sourcemap: false,
        },
    ],
    plugins: [
        ...baseConfig.plugins,
        typescript({ sourceMap: false, inlineSources: false }),
        copy({
            targets: [
                { src: 'types/index.d.ts', dest: 'dist/' },
                { src: 'types/core/ThreeJarvisLoader.d.ts', dest: 'dist/' },
            ],
        }),
    ],
};
