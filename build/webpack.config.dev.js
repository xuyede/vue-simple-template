const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const HtmlPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const devServer = {
    contentBase : path.resolve(__dirname, '../dist'),
    compress : true,
    progress : true,
    hot : true
}

const devConfig = merge(baseConfig, {
    mode : 'development',
    devServer,
    plugins : [
        new HtmlPlugin({
            template : path.resolve(__dirname, '../src/index.html'),
            filename : 'index.html'
        }),
        new VueLoaderPlugin()
    ],
    module : {
        rules : [
            {
                test : /\.styl(us)?$/,
                use : [
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