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
    module: {
        rules: [
            {
                test: [/\.css$/, /\.scss$/],
                use: [
                    {
                        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory'],
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
                use: ['file-loader']
            }
        ]
    },
    resolve: {
        // 别名，路径映射
        alias: {
            'react$': '/path/to/react.min.js', // 将代码中的以react结尾的路径映射成新路径
            '@': './src' // 方便开发，将src地址简化为@符号，这样可以很容易引用相对路径资源
        },
        // 导入模块未写后缀名时，webpack会按着extension配置的后缀查找，找到即止。默认['.js', '.json']
        // 为了编译效率，代码中不太建议省略文件后缀，增加webpack检索文件负担
        extensions: ['.js', '.css'],
        // 配置webpack去哪里找第三方模块，默认去node_modules下查找，如果组件大量存放在src/components下，可以如下配置
        modules: ['./src/components', 'node_modules'],
        // 通常情况下，第三方模块都会在node_modules，components下放的都是本项目依赖
        // 为了减小webpack编译时检索第三方模块的压力，建议写明路径
        modules: path.resolve(__dirname, 'node_modules'),
        // 强制所有导入语句都必须带文件后缀-默认false
        enforceExtension: false
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? `[name].css` : `[name]_[contenthash:8].css`,
            chunkFilename: devMode ? `[name].css` : `[name]_[contenthash:8].css`
        })
    ]
}

