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
                test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
                use: ['file-loader']
            },
            {
                test: [/\.ts?$/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    }
                ]
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

    devtool: 'source-map',

    externals: {
        jquery: 'jQuery'
    },

    // 告诉 Webpack 如何去寻找 Loader。因为在使用 Loader 时是通过其包名称去引用的， Webpack 需要根据配置的 Loader 包名去找到 Loader 的实际代码，以调用 Loader 去处理源文件。
    // 常用于加载本地的 Loader
    resolveLoader:{
        // 去哪个目录下寻找 Loader
        modules: ['node_modules'],
        // 入口文件的后缀
        extensions: ['.js', '.json'],
        // 指明入口文件位置的字段
        mainFields: ['loader', 'main']
    }
}

