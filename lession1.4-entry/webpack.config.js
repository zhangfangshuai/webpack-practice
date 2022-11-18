/**
 * @name webpack配置文件
 * @desc 构建运行在Node.js环境中，使用CommonJs规范编写配置对象（CommonJs规范可以直接运行在Node环境中）
 */

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: devMode ? 'development' : 'production',
    // 在寻找相对路径的文件时会以 context 为根目录，context 默认为执行启动 Webpack 时所在的当前工作目录
    // context的值会影响entry值的配置
    context: path.join(__dirname, '/'), // 非必选
    // 页面入口，解析依赖入口模块；每个入口最终会打包出一个chunk文件（splitChunk除外）
    // 三种类型：字符串->1个chunk，数据->1个chunk，对象-〉多个chunk
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    // webpack提供devServer，便于（1）在开发环境启动http服务而不是使用本地预览；（2）实时预览；（3）模块热替换；
    // 使用devServer启动服务时，不会输出dist打包文件，webpack会讲构建出来的文件保存在内存中，因此也不会理会打包的配置output.path等属性，如需更改，需在devServer中配置
    devServer: {
        static: {
            directory: path.join(__dirname, '/src/')
        }
    },
    module: {
        // loader主要用作文件转换、语言翻译，将webpack不识别的语言如css转换成能识别的js-string，再进行打包
        // 多个loader共同作用时有先后顺序，即从右到左，从下到上
        rules: [
            {
                test: /\.css$/, // 正则匹配
                use: [
                    {
                        // webpack开发模式不能使用miniCssExtractPlugin.loader
                        // webpack5使用mini-css-extract-plugin，webpack4及以下使用extract-text-webpack-plugin
                        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    },
                    'css-loader'
                ] 
            }
        ]
    },
    // plugin用来扩展webpack功能，通过在构建流程里注入钩子实现
    // 接收一个数组，数组每一项都是一个plugin实例
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? `[name].css` : `[name]_[contenthash:8].css`,
            chunkFilename: devMode ? `[id].css` : `[id]_[contenthash:8].css`
        })
    ]
}

