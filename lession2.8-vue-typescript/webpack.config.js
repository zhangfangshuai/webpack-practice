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
        extensions: ['.ts', '.js', '.vue', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    // // 让 tsc 把 vue 文件当成一个 TypeScript 模块去处理，以解决 moudle not found 的问题，tsc 本身不会处理 .vue 结尾的文件
                    appendTsSuffixTo: [/\.vue$/],
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    // 开发环境输出source-map，便于再浏览器查看ES6和Typescript等源码
    // devtool: devMode ? 'source-map' : 'none'
}
