import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import {name} from '../package.json';
import scss from 'rollup-plugin-scss';
import pkg from '../package.json';
export default {
	input: 'src/index.ts',
	output: [
		// commonjs
		{
			// package.json 配置的 main 属性
			file: pkg.main,
			sourcemap: true,
			format: 'cjs',
		},
		// es module
		{
			// package.json 配置的 module 属性
			file: pkg.module,
			sourcemap: true,
			format: 'es',
		},
		// umd
		{
			// umd 导出文件的全局变量
			name,
			// package.json 配置的 umd 属性
			file: pkg.umd,
			sourcemap: true,
			format: 'umd',
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
