const webpack = require('webpack');
const path = require('path');
const { CheckerPlugin, TsConfigPathsPlugin } = require("awesome-typescript-loader");

module.exports = {
    context: path.resolve(__dirname),
    devtool: 'inline-source-map',
    entry: "./index.ts",
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'nicovideo-api-nodejs-client.js',
        publicPath: 'http://localhost:8080/',
    },
    devServer: {
        hot: true,
        publicPath: 'http://localhost:8080/',
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.ts?/,
                loader: "awesome-typescript-loader",
            }
        ],
    },
    plugins: [
        new TsConfigPathsPlugin(),
        new CheckerPlugin(),
    ],
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    target: "node",
};
