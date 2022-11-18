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
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css'],
    },
    module: {
        rules: [
            // vue-loader要在其他loader之前处理
            {
                test: [/\.vue$/],
                use: ['vue-loader']
            },
            {
                test: [/\.css$/, /\.scss$/],
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            //使用babel-loader，webpack编译时会去查找.babelrc配置文件。
            // 本案例中：通过配置babel-preset-react对react语法解析进行支持
            {
                test: [/\.js$/],
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
    // 开发环境输出source-map，便于再浏览器查看ES6和Typescript等源码
    // devtool: devMode ? 'source-map' : 'none'
    // devtool: 'source-map'
}
