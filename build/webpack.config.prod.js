const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const HtmlPlugin = require('html-webpack-plugin')
const MiniCssPlugin = require('mini-css-extract-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyjsPlugin = require('uglifyjs-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const prodConfig = merge(baseConfig, {
    mode : 'production',
    entry : {
        app : path.resolve(__dirname, '../src/index.js'),
        vendor : ['vue']
    },
    output : {
        filename: 'static/js/[name].[chunkhash:8].js',
    },
    optimization : {
        runtimeChunk : {
            name : 'runtime'
        },
        splitChunks : {
            cacheGroups : {
                vendor : {
                    name : 'vendor'
                }
            }
        },
        minimizer : [
            new UglifyjsPlugin({
                parallel : true,
                cache : true,
                sourceMap : true
            }),
            new OptimizeCssPlugin({})
        ]
    },
    plugins : [
        new HtmlPlugin({
            template : path.resolve(__dirname, '../src/index.html'),
            filename : 'index.html',
            minify : {
                removeAttributeQuotes : true,
                collapseWhitespace : true,
            },
            hash : true
        }),
        new MiniCssPlugin({
            filename : '/static/css/app.[hash:8].css'
        }),
        new CleanPlugin({}),
        new VueLoaderPlugin()
    ],
    module : {
        rules : [
            {
                test : /\.styl(us)?$/,
                use : [
                    MiniCssPlugin.loader,
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

module.exports = prodConfig