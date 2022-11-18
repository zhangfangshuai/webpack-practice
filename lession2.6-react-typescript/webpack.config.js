/**
 * @name webpack配置文件
 */

const path = require('path')
const devMode = process.env.NODE_ENV !== 'production'

const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    mode: devMode ? 'development' : 'production',
    entry: './src/main.tsx',
    output: {
        filename: '[name]_[contenthash:8].js',
        chunkFilename: '[name]_[contenthash:8].js'
    },
    devServer: {
        port: 5000
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css'],
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            // TS 相比于Babel的优点在于它原生支持JSX语法，你不需要重新安装新的依赖，只需修改一行tsconfig的配置
            // 不同在于（1）使用了 JSX 语法的文件后缀必须是 tsx
            // （2）由于React不是采用 TS 编写的，需要安装 react 和 react-dom 对应的 TypeScript 接口描述模块 @types/react 和 @types/react-dom 后才能通过编译
            {
                test: /\.tsx?$/, // 对ts、tsx都采用awesome-typescript-loader转换
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
