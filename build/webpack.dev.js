const {merge} = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        port: 4200,
        overlay: true,
        historyApiFallback: true,
        contentBase: common.externals.paths.dist,
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
                exclude: [/node_modules/]
            },
        ]
    }
});