import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import scss from 'rollup-plugin-scss';
import pkg from '../package.json';
import typescript from "rollup-plugin-typescript2";
import path from "path";
import copy from 'rollup-plugin-copy';
// import css from "rollup-plugin-import-css";
import css from 'rollup-plugin-css-only'

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
	onwarn: function(warning, handler) {
		// Skip certain warnings

		// should intercept ... but doesn't in some rollup versions
		if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }

		// console.warn everything else
		handler( warning );
	},
	plugins: [
		commonjs(),
		tsPlugin,
		replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			preventAssignment: true,
		}),
		resolve(),
		copy({
			copyOnce: true,
			targets: [
				{
					src: 'node_modules/@shoelace-style/shoelace/dist/assets',
					dest: 'dist/shoelace'
				}
			]
		}),
		css({output: 'bundle.css'}),
		scss({fileName: 'bundle_sass.css', insert: true}),
	],
};
