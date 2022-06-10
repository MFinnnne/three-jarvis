module.exports = {
    env: {
        "development": {
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
        "production": {
            presets: ['@babel/preset-env','@babel/preset-typescript']
        }
    },
};
