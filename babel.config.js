module.exports = {
    presets: [['@babel/preset-env', {
        modules: false,
        targets: {
            node: 'current',
        }
    }], '@babel/preset-typescript', 'babel-preset-million'],
    plugins: [
        '@babel/plugin-transform-modules-commonjs',
        [
            "@babel/plugin-transform-react-jsx",
            {
                "runtime": "automatic",
                "importSource": "million"
            }
        ]
    ],
};
