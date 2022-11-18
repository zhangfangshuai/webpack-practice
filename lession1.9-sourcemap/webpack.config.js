/**
 * @name webpack配置文件
 */

const path = require('path')
const devMode = process.env.NODE_ENV !== 'production'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    mode: devMode ? 'development' : 'production',
    context: path.join(__dirname, '/'),
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
                test: /\.(gif|png|jpe?g|eot|woff|ttf|pdf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 30,
                            fallback: 'file-loader'
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: 'svg-inline-loader'
            }
        ]
    },

    resolve: {
        alias: {
            'react$': '/path/to/react.min.js',
        },
        extensions: ['.js', '.css'],
        modules: ['./src/components', 'node_modules'],
        enforceExtension: false
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? `[name].css` : `[name]_[contenthash:8].css`,
            chunkFilename: devMode ? `[name].css` : `[name]_[contenthash:8].css`,
            ignoreOrder: true
        }),

        new HtmlWebpackPlugin({
            template: './src/index.html',
        })
    ],

    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            automaticNameDelimiter: '~',
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
        }
    },

    // devtool 专门用来配置Webpack如何生成Source Map，他有以下几种配置：
    // ''/false/'none': 不生产source map
    // eval: 每个module 都会封装到eval里包裹起来执行，并且会在每个eval语句的末尾追加注释 //# sourceURL=微博怕吃苦：///./main.js
    // source-map: 输出质量最高、最详细的Source Map，额外生成一个.map文件，并在js文件末尾追加注释sourceMappingURL=bundle.js.map
    // hidden-soure-map: 和source-map类似，但不会额外生成.map文件，只在js文件末尾追加注释sourceMappingURL=bundle.js.map
    // inline-source-map: 和source-map类似，但不会生成.map文件，而且把sourcemap转换成base64嵌入到JS中
    // eval-source-map: 和eval类似，但会吧模块的sourcemap转换成base64嵌入到eval语句末尾例如 //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW...
    // cheap-source-map: 和 source-map 类似，但生成的 Source Map 文件中没有列信息，因此生成速度更快
    // cheap-module-source-map: 和 cheap-source-map 类似，但会包含 Loader 生成的 Source Map
    // cheap-module-eval-source-map: 和 cheap-module-source-map 类似，构建速度更快
    // 【最佳实践】在开发环境下使用cheap-module-eval-source-map，在生产环境使用hidden-source-map
    devtool: devMode ?'cheap-module-eval-source-map' : 'hidden-source-map',
    // webpack@4及以下版本使用comfigureWebpack配置，现已废弃
    // configureWebpack: {
    //     devtool: '',
    // },
}

