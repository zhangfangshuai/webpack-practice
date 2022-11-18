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

    // 告诉 Webpack 要构建的代码中使用了哪些不用被打包的模块，也就是说这些模版是外部环境提供的，Webpack 在打包时可以忽略它们。
    // 对于一些第三方库如jQuery，构建后你会发现输出的 Chunk 里包含的 jQuery 库的内容，这导致它出现了2次，浪费加载流量，最好是 Chunk 里不会包含 jQuery 库的内容。
    externals: {
        // 把导入语句里的jquery替换成运行环境里的全局变量jQuery
        jquery: 'jQuery'
    }
}

