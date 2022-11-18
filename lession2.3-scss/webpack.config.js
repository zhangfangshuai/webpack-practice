/**
 * @func webpack配置文件
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
        https: false,
        port: 5000
    },
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.json', '.css']
    },
    module: {
        rules: [
            {
                test: [/\.css$/],
                use: ['style-loader', 'css-loader']
            },
            // 通过sass-loader吧scss代码转换为css代码，再把css代码交给css-loader处理
            // css-loader会找出代码中@import和url()这样的导入语句，告诉webpack依赖这些资源。同时支持css modules、压缩css等功能。处理完成交给style-loader
            // style-loader会把css代码转换成字符串后，注入到javascript中去，通过js给DOM增加样式。
            // 如果想把css代码单独提取到一个文件而不是和js混在一起，可以使用webpack@3的ExtractTextPlugin或webpack@4及以上的MiniCssExtractPlugin
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                use: 'babel-loader?cacheDirectory',
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.ts$/,
                use: 'awesome-typescript-loader',
                include: path.resolve(__dirname, 'src')
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devtool: devMode ? 'source-map' : 'none'
}

