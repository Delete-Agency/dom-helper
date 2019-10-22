const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    return {
        mode: "production",
        entry: {
            "dom-helper": "./index.js",
        },
        output: {
            path: __dirname + '/build',
            filename: "[name].min.js",
            libraryTarget: 'umd',
            library: 'DOMHelper'
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
