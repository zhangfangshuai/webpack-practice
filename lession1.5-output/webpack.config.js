/**
 * @name webpack配置文件
 * @desc 构建运行在Node.js环境中，使用CommonJs规范编写配置对象（CommonJs规范可以直接运行在Node环境中）
 */

const path = require('path') // 该服务由webpack内置，NodeJs提供
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: devMode ? 'development' : 'production',
    // 在寻找相对路径的文件时会以 context 为根目录，context 默认为执行启动 Webpack 时所在的当前工作目录
    // context的值会影响entry值的配置
    context: path.join(__dirname, '/'), // 非必选
    // 页面入口，解析依赖入口模块；每个入口最终会打包出一个chunk文件（splitChunk除外）
    // 三种类型：字符串->1个chunk，数组->1个chunk，对象-〉多个chunk
    entry: './src/main.js',
    // webpack进过打包流程后的产物，输出的文件配置，输出位置等配置项
    output: {
        // filename可以写成静态字符串，或动态模版字符串，常见的模版有[name]、[id]、[hash]、[contenthash]，id会从0开始，后两者默认20位，可指定具体位数如[hash:8]
        // ExtractTextWebpackPlugin插件使用contenthash
        filename: devMode ? '[name].js' : '[name].[content:8].js',
        // chunkFilename配置无入口chunk的命名规则，如CommonChunkPlugin构建出来的文件
        chunkFilename: devMode ? '[name].js' : '[name].[content:8].js',
        // path：配置输出文件的本地目录，必须是String类型的绝对路径，通常用Node.js的path模块去获取绝对路径
        path: path.resolve(__dirname, './dist'),
        // publicPath：打出来的包，发布到远端服务器上时，需要增加的访问前缀，如打出来的包在/dist/aaa下，则配置 /aaa/
        // 也可以配置绝对路径，如发布到cdn上，'https://cdn.example.com/assets/'，那么访问时就在html里引入<script src='https://cdn.example.com/assets/a_12345678.js'></script>
        publicPath: '/',
        // 需要异步加载的资源（通过JSONP实现，动态向HTML中插入script标签），配置标签的crossorigin值。anonymous(默认)-不带用户Cookes，use-credentials-带用户Cookies
        crossOriginLoading: 'use-credentials',
        // 当需要被其他库导入使用时，需要配置library和library，它们成对使用。libraryTarget配置以何种模块化标准导出库，library则是到处库的模块化名称
        libraryTarget: 'var', // ‘var’(默认)-使用方：LibName.doSomething(), ‘commonjs’-使用方：require(library-name-in-npm)['LibName'].doSomething()
        library: 'LibName', // 'this'-使用方：this.libName.doSomething(), 'window'-使用方：window.Library.doSomething(), 还有commonjs2 和 global两种
        libraryExport: 'doSomething', // 指定子模块导出，仅在libraryTarget为commonjs或commonjs2时有意义
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
        // MiniCssExtractPlugin使用的是contenthash而不是chunkhash
        new MiniCssExtractPlugin({
            filename: devMode ? `[name].css` : `[name]_[contenthash:8].css`,
            chunkFilename: devMode ? `[name].css` : `[name]_[contenthash:8].css`
        })
    ]
}

