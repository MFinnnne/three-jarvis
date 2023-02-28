import alias from 'rollup-plugin-alias';
import resolve from 'rollup-plugin-node-resolve';

import commonjs from '@rollup/plugin-commonjs';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import replace from 'rollup-plugin-replace';
import sass from 'rollup-plugin-scss';
import { name } from '../package.json';

export default {
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
		commonjs(),
		alias({
			resolve: ['.ts'],
		}),
		replace({
			'process.env.NODE_ENV': JSON.stringify(
				process.env.NODE_ENV || 'development',
			),
		}),
		resolve(),
		sass({
			input: 'src/sass/full.scss',
			output: './dist/bundle.css',
			insert: true,
			processor: (css) =>
				postcss([autoprefixer])
					.process(css, {from: undefined})
					.then((result) => result.css),
		}),
	],
	format: 'esm',
};
