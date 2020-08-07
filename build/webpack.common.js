const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

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

            {
                test: /\.(ttf|eot|woff|svg|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: `${PATHS.assets}fonts/[name].[ext]`
                },
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
        }),
        new CopyPlugin({
            patterns: [
                {from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img`},
                {from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts`}
            ]
        }),
    ],

    resolve: {
        extensions: ['.js', '.ts']
    }
};