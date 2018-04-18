const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ENV = (process.env.NODE_ENV || 'development').toLowerCase();

module.exports = {
    mode: ENV === 'production' ? ENV : 'development',
    entry: {
        srplib: './client.js'
    },
    output: {
        library: '[name]',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'browser'),
        filename: 'srp-browser.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(ENV)
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                safari10: true
            }
        })
    ],
    devtool: 'cheap-module-source-map',
    target: 'web'
};
