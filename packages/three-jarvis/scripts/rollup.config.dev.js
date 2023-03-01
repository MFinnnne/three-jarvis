import {nodeResolve} from '@rollup/plugin-node-resolve';
import baseConfig from './rollup.config.base.js';
import typescript from 'rollup-plugin-typescript2';
import path from 'path';
import sourceMaps from 'rollup-plugin-sourcemaps';
const getPath = (_path) => path.resolve(__dirname, _path);

const tsPlugin = typescript({
	tsconfig: getPath('../tsconfig.json'),
});

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
		tsPlugin,
	],
};
