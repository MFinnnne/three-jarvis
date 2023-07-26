module.exports = {
	plugins: [
		["@babel/plugin-proposal-decorators", {
			"version": "2018-09",
			"decoratorsBeforeExport": true
		}],
		["@babel/plugin-transform-typescript", {
			"allowDeclareFields": true
		}],
		["@babel/plugin-proposal-class-properties"],
		// 双问号
		'@babel/plugin-proposal-nullish-coalescing-operator',
		// 可选链
		'@babel/plugin-proposal-optional-chaining'
	],
	assumptions: {
		"setPublicClassFields": true
	},
	env: {
		development: {
			presets: [
				[
					'@babel/preset-env',
					{
						targets: {
							node: 'current',
						},
					},
				],
				'@babel/preset-typescript',
			],
		},
		production: {
			presets: ['@babel/preset-env', '@babel/preset-typescript'],
		},
	},
};
