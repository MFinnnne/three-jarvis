import baseConfig from './rollup.config.base.js';
import pkg from '../package.json';
import strip from "@rollup/plugin-strip";
import {getBabelOutputPlugin} from "@rollup/plugin-babel";
import path from "path";

export default {
	...baseConfig,
	input: 'src/index.ts',
	output: [
		// commonjs
		{
			// package.json 配置的 main 属性
			file: pkg.main,
			sourcemap: false,
			format: 'cjs',
		},
		// es module
		{
			// package.json 配置的 module 属性
			file: pkg.module,
			sourcemap: false,
			format: 'es',
		}
	],
	plugins: [...baseConfig.plugins, strip(), getBabelOutputPlugin({
		configFile: path.resolve(__dirname, '../babel.config.js')
	})],
};
