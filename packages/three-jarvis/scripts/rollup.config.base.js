import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import {name} from '../package.json';
import scss from 'rollup-plugin-scss';

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
		replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			preventAssignment: true,
		}),
		resolve(),
		scss({fileName: 'bundle.css', insert: true}),
	],
};
