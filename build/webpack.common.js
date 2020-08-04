const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
    src: path.resolve(__dirname, '../src'), 
    dist: path.resolve(__dirname, '../dist'),
    assets: 'assets/'
}

module.exports = {
    externals: {
        paths: PATHS,
    },

    entry: {
        app: `${PATHS.src}/main.ts`
    },

    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: `${PATHS.dist}`,
        publicPath: '/',
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: [/node_modules/]
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/index.html`
        }),
        new webpack.ProvidePlugin({
            Handlebars: '../node_modules/'
        })
    ],

    resolve: {
        extensions: ['.js', '.ts']
    }
};