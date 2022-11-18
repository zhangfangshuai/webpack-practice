/**
 * @name webpack配置文件
 */

const path = require('path')
const devMode = process.env.NODE_ENV !== 'production'

const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    mode: devMode ? 'development' : 'production',
    entry: './src/main.ts',
    output: {
        filename: '[name]_[contenthash:8].js',
        chunkFilename: '[name]_[contenthash:8].js'
    },
    devServer: {
        port: 5000
    },
    resolve: {
        // 先找ts，再找js
        extensions: ['.ts', '.js', 'jsx', '.json', 'css'],
    },
    module: {
        rules: [
            {
                test: [/\.css$/, /\.scss$/],
                use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
                include: path.resolve(__dirname, 'src')
            },
            // 使用babel， 引入babel-loader后，webpack编译时会去查找.babelrc配置文件，并读取babel配置的plugins和presets
            {
                test: [/\.js$/],
                use: ['babel-loader?cacheDirectory'],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    // 开发环境输出source-map，便于再浏览器查看ES6和Typescript等源码
    devtool: devMode ? 'source-map' : 'none'
}
