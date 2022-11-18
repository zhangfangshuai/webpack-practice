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
            // postcss-loader用于给css增加浏览器兼容样式，如chrome浏览器增加-webkit-前缀
            // postcss-loader还支持使用下一代语法，如css3的变量。
            // postcss并没有特殊的专属写法，它的文件以.css结尾，区别在于它是支持且不限于以上两个特性的css用法
            // PostCss和css的关系就如 Babel与JavaScript的关系，解除了语法禁锢，通过插件扩展语法
            // PostCss和SCSS的关系就如 Babel于TypeScript的关系。PostCss更加灵活且容易扩展，而SCSS内置大量功能却不能扩展
            // 【注】配置了postcss-loader后webpack在编译时会去根目录查找postcss-config.js的配置
            {
                test: [/\.css$/, /\.scss$/],
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: [/\.js$/],
                use: ['babel-loader?cacheDirectory'],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                include: path.resolve(__dirname, 'src')
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
