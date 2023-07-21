import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import scss from 'rollup-plugin-scss';
import pkg from '../package.json';
import typescript from "rollup-plugin-typescript2";
import path from "path";

const getPath = (_path) => path.resolve(__dirname, _path);

const tsPlugin = typescript({
	tsconfig: getPath('../tsconfig.json'),
});
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
		}
	],
	plugins: [
		commonjs(),
		tsPlugin,
		replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			preventAssignment: true,
		}),
		resolve(),
		scss({fileName: 'bundle.css', insert: true}),
	],
};
