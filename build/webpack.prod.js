const {merge} = require('webpack-merge');
const common = require('./webpack.common');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
    mode: 'production',

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', 
                    'sass-loader',

                ],
                exclude: [/node_modules/]
            },
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: `${common.externals.paths.assets}css/[name].css`
        }),
    ]
});
