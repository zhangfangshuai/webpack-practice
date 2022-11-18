/**
 * @name webpack配置文件
 * @desc 构建运行在Node.js环境中，使用CommonJs规范编写配置对象（CommonJs规范可以直接运行在Node环境中）
 */

const devMode = process.env.NODE_ENV !== 'production'
const path = require('path') // 该服务由webpack内置，NodeJs提供
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

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
        hot: true,
        https: false,
        port: 5000
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader'],
                include: path.resolve(__dirname, 'src')
            },
            {
                test: [/\.css$/, /\.scss$/],
                use: [
                    MiniCssExtractPlugin.loader, // 这里不用style-loader把css代码插入js中，而是用MiniCssExtractPlugin.loader将css抽离到单独文件
                    'css-loader', // webpack5移除了css-loader?minimize参数，使用css-minimizer-webpack-plugin压缩
                    'postcss-loader'
                ],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.js$/,
                // 加载自定义replace-loader，也可以使用path.resolve(__dirname, './loaders/replace-loader.js')直接定位到loader上
                use: ['babel-loader?cacheDirectory', 'replace-loader'], // ?cacheDirectory参数，将编译过的文件加入缓存目录，下次遇到相同js直接从缓存目录中读取
                include: path.resolve(__dirname, 'src')
            },
            {
                test: [/\.ts?$/],
                loader: 'awesome-typescript-loader',
                include: path.resolve(__dirname, 'src')
            },
            // webpack5 中废弃了url-loader、file-loader，使用asset/resource默认处理二进制资源
            {
                test: /\.(png|jpe?g|gif|eot|woff|ttf|pdf|svg)$/,
                type: 'asset/resource'
            },
        ]
    },
    resolveLoader: {
        // 定义用户从哪里找loader。先从node_modules目录查找，找不到后去loaders查找
        modules: ['node_modules', 'loaders']
    },
    plugins: [
        // webpack5新增MiniCssExtractPlugin，废弃了ExtractTextPlugin，用户抽离css到单独文件中
        new MiniCssExtractPlugin({
            filename: devMode ? `[name].css` : `[name]_[contenthash:8].css`,
            chunkFilename: devMode ? `[name].css` : `[name]_[contenthash:8].css`
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new VueLoaderPlugin()
    ],
    devtool: devMode ? 'eval-cheap-module-source-map' : 'hidden-source-map',

    // optimization: {
    //     minimizer: [
    //         // 压缩css
    //         new CssMinimizerPlugin()
    //     ]
    // }
}

