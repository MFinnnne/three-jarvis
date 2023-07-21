module.exports = {
	plugins: [
		// 双问号
		'@babel/plugin-proposal-nullish-coalescing-operator',
		// 可选链
		'@babel/plugin-proposal-optional-chaining'
	],
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
