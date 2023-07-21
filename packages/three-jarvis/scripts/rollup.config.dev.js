import {nodeResolve} from '@rollup/plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import baseConfig from './rollup.config.base.js';

export default {
	...baseConfig,
	plugins: [
		...baseConfig.plugins,
		nodeResolve({
			browser: true,
			mainFields: ['module', 'main'],
			preferBuiltins: true,
		}),
		sourceMaps(),
	],
};
