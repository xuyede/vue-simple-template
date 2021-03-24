const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const HtmlPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const devServerConfig = {
    dev: {
        https: false,
        host: '127.0.0.1',
        port: '12306'
    }
}

const devServer = {
    contentBase: path.resolve(__dirname, '../dist'),
    overlay: true,
    quiet: true,
    port: devServerConfig.dev.port,
}

const devConfig = merge(baseConfig, {
    mode: 'development',
    devServer,
    plugins: [
        new HtmlPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            filename: 'index.html'
        }),
        new VueLoaderPlugin(),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [
                    `Your application is running here: ${
                    devServerConfig.dev.https ? "https" : "http"
                    }://${devServerConfig.dev.host}:${devServerConfig.dev.port}`,
                ],
            },
            clearConsole: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.styl(us)?$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            }
        ]
    }
})

module.exports = devConfig
