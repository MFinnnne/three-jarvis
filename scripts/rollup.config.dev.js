import baseConfig from './rollup.config.base';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import { nodeResolve } from '@rollup/plugin-node-resolve';

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
    ],
};
