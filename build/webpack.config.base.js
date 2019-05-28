const path = require('path')

const baseConfig = {
    entry: path.join(__dirname, '../src/index.js'),
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 9 * 1024,
                            fallback : 'file-loader',
                            name: '[name].[hash:8].[ext]',
                            outputPath : '/static/image/'
                        }
                    }
                ]
            },
            {
                test: /\.js(x)?$/,
                use : 'babel-loader',
                exclude : /node_modules/
            }
        ]
    }
}

module.exports = baseConfig