import {nodeResolve} from '@rollup/plugin-node-resolve';
import path from 'path';
import postcss from 'postcss';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import baseConfig from './rollup.config.base.js';
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
		postcss(),
	],
};
