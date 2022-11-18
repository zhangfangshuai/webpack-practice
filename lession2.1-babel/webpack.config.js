/**
 * @name webpack配置文件
 */

const path = require('path')
const devMode = process.env.NODE_ENV !== 'production'

const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    mode: devMode ? 'development' : 'production',
    entry: './src/main.js',
    output: {
        filename: '[name]_[contenthash:8].js',
        chunkFilename: '[name]_[contenthash:8].js'
    },
    devServer: {
        port: 5000
    },
    module: {
        rules: [
            {
                test: [/\.css$/, /\.scss$/],
                use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
                include: path.resolve(__dirname, 'src')
            },
            // 使用babel，webpack编译时会去查找.babelrc配置文件，并读取配置的plugins和presets
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory'],
                exclude: path.resolve(__dirname, 'node_modules')
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    // 开发环境配置source-map，方便查看被babel解析前的es6等源代码，以便跟踪问题
    devtool: devMode ? 'source-map' : 'none'
}
