/**
 * @name webpack配置文件
 */

const path = require('path')
const devMode = process.env.NODE_ENV !== 'production'

// const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin') - webpack@4及以上已废弃
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// webpack5已经取消了内置uglifyJs，需要单独安装插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


module.exports = {
    mode: devMode ? 'development' : 'production', // 不同的mode，webpack有内置的优化
    context: path.join(__dirname, '/'), // 非必选
    entry: './src/main.js',
    output: {
        filename: '[name].[contenthash:8].js',
        chunkFilename: '[name].[contenthash:8].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
    },
    devServer: {
        hot: true,
        historyApiFallback: {
            rewrites: [
                { from: '/^\/user/', to: 'user.html' },
                { from: /./, to: '/index.html' }
            ]
        },
        host: 'localhost',
        port: '5000',
        https: false,
        compress: false,
        open: false
    },
    // loader主要用作文件转换、语言翻译，将webpack不识别的语言如css转换成能识别的js-string，插入到js中，再进行打包
    module: {
        rules: [
            {
                test: [/\.css$/, /\.scss$/],
                use: [
                    {
                        // webpack开发模式不能使用miniCssExtractPlugin.loader
                        // webpack5使用mini-css-extract-plugin，webpack4以下使用extract-text-webpack-plugin
                        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
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
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        alias: {
            '@': './src',
        },
        extensions: ['.js', '.css'],
        modules: [path.resolve(__dirname, 'node_modules')]
    },
    // plugin用来扩展webpack功能，通过在构建流程里注入钩子实现
    // 接收一个数组，数组每一项都是一个plugin实例
    plugins: [
        // 所有页面都会用到的公共代码提取到 common 代码块中
        // !!! CommonsChunkPlugin在webpack@4及以上版本中被移除，取而代之的是SplitChunkPlugin，使用optimization.splitChunk配置
        // new CommonsChunkPlugin({
        //     name: 'commons',
        //     filename: 'commons.js',
        //     minChunks: 3, // 被三个页面用到的代码，认定为公共代码 
        //     chunks: ['pageA', 'pageB'] // 指定从哪些chunk中去找公共模块，默认 entry chunk
        // }),
        // 从bundle中提取css到单独文件，以便于css bundle和js bundle可以并行加载。当然也会多出一个文件
        // 注意使用本插件时，loader中需要配置对应的MiniCssExtractPlugin.loader，并设置fallback: ‘style-loader’

        new MiniCssExtractPlugin({
            filename: devMode ? `[name].css` : `[name]_[contenthash:8].css`,
            chunkFilename: devMode ? `[name].css` : `[name]_[contenthash:8].css`,
            ignoreOrder: true // 禁用顺序检查
        }),

        // 在output配置的指定path下生成新的index.html文件，它使用script标签引用所有打包完成的chunk包
        new HtmlWebpackPlugin({
            // 根据模版文件生成新html文件，template指定模版html文件位置
            template: './src/index.html',
        })
    ],
    optimization: {
        // SplitChunksPlugin，取代webpack@3 的 CommonsChunkPlugin
        // 取代的办法是：在splitChunks.cacheGroups.commons中配置
        splitChunks: {
            chunks: 'all', // 'initial'-初始化，‘all’-全部(默认)，‘async’-动态加载
            minSize: 30000, // 新代码块的最小体积，只有 >=minSize的bundle才会被拆分出来
            // maxSize: 0, // 拆分之前最大的数值，0-表示不做限制 maxSize要大雨minSize。
            minChunks: 1, // 资源最少被引入几次才可以被拆分出来
            maxAsyncRequests: 30, // 按需加载最大并行请求数
            maxInitialRequests: 30, // 入口点最大并行请求数
            automaticNameDelimiter: '~', // 文件连接符，webpack使用chunk的来源和名称拼接，如vendors-main.js
            // 拆分包后的缓存组，有利于webpack下次编译更加快速。
            // 内部配置覆盖外部配置
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },

        // webpack5使用optimization.minimizer配置压缩JS
        minimizer: [
            // 压缩JS代码
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        // 在UglifyJs删除没有用到的代码时不输出警告
                        warnings: false,
                        // 删除console语句。
                        drop_console: true,
                        // 内嵌定义了但只用到一次的变量
                        collapse_vars: true,
                        // 提取出现多次但没有定义成变量去引用的静态值
                        reduce_vars: true
                    },
                    output: {
                        // 紧凑输出
                        beautify: false,
                        // 删除注释
                        comments: false
                    }
                }
            })
        ]
    },
}

