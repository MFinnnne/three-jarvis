import baseConfig from './rollup.config.base.js';
import {name} from '../package.json';
import typescript from '@rollup/plugin-typescript';
import strip from "@rollup/plugin-strip";

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
	plugins: [...baseConfig.plugins, strip(), typescript({sourceMap: false, inlineSources: false})],
};
