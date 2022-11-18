/**
 * @name webpack配置文件
 * @desc 构建运行在Node.js环境中，使用CommonJs规范编写配置对象（CommonJs规范可以直接运行在Node环境中）
 */

const path = require('path') // 该服务由webpack内置，NodeJs提供
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: devMode ? 'development' : 'production',
    context: path.join(__dirname, '/'), // 非必选
    entry: './src/main.js',
    output: {
        filename: devMode ? '[name].js' : '[name].[content:8].js',
        chunkFilename: devMode ? '[name].js' : '[name].[content:8].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '/src/')
        }
    },
    // 在Webpack中，一切皆模块。module配置指明如何处理模块。使用rules配置模块的读取和解析规则
    module: {
        // loader主要用做文件转换、语言翻译，将webpack不识别的语言如css转换成能识别的js-string，再进行打包
        rules: [
            {
                // 使用test正则匹配文件、使用include、exclude限定匹配范围，指定文件夹。
                test: [/\.css$/, /\.scss$/], // 命中css文件，支持数组类型
                // 使用use配置需要使用的loader，可传入多个loader共同作用，遵循从右到左，从下到上的顺序
                use: [
                    {
                        // webpack开发模式不能使用miniCssExtractPlugin.loader
                        // webpack5使用mini-css-extract-plugin，webpack4及以下使用extract-text-webpack-plugin
                        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    },
                    'css-loader', // 将import等模块css整合到一个文件
                    'sass-loader', // 将scss语法转css
                    'postcss-loader' // 添加浏览器兼容前缀
                ],
                // 此规则不应用于node_modules文件夹下的css文件
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.js$/, // 命中js文件
                // ?cacheDirectory参数，用户缓存babel编译结果加快重新编译速度,
                use: ['babel-loader?cacheDirectory'],
                // 只在src目录里查找js文件，可以提高编译速度
                include: path.resolve(__dirname, 'src')
            },
            {
                // 非文本文件使用file-loader
                test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
                use: ['file-loader']
            },
            // use 里的loader参数较多时，可以改为一个对象，如下
            {
                test: [/\.ts?$/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                        // enforce: 'post' // enforce强制改变此loader执行优先级，post-最后执行, pre-最先执行
                    }
                ]
            }
        ]
    },
    // plugin用来扩展webpack功能，通过在构建流程里注入钩子实现
    // 接收一个数组，数组每一项都是一个plugin实例
    plugins: [
        // MiniCssExtractPlugin使用的是contenthash而不是chunkhash
        new MiniCssExtractPlugin({
            filename: devMode ? `[name].css` : `[name]_[contenthash:8].css`,
            chunkFilename: devMode ? `[name].css` : `[name]_[contenthash:8].css`
        })
    ]
}

