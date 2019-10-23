const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    return {
        mode: "production",
        entry: {
            "dom-helper": "./src/index.js",
        },
        output: {
            path: __dirname + '/standalone',
            filename: "[name].min.js",
            library: 'DOMHelper',
            libraryTarget: 'umd'
        },
        resolve: {
            extensions: ['.js'],
            modules: ['node_modules']
        },
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    }
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
        ],
    }
};
