/**
 * @name webpack配置文件
 * @desc 构建运行在Node.js环境中，使用CommonJs规范编写配置对象（CommonJs规范可以直接运行在Node环境中）
 */

const devMode = process.env.NODE_ENV !== 'production'
const path = require('path') // 该服务由webpack内置，NodeJs提供
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
                use: ['vue-loader']
            },
            {
                test: [/\.css$/, /\.scss$/],
                use: [
                    {
                        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    },
                    'css-loader', // 将import等模块css整合到一个文件
                    'postcss-loader' // 添加浏览器兼容前缀，同时支持sass解析
                ],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory'], // ?cacheDirectory参数，用户缓存babel编译结果加快重新编译速度,
                include: path.resolve(__dirname, 'src')
            },
            {
                test: [/\.ts?$/],
                loader: 'awesome-typescript-loader',
                include: path.resolve(__dirname, 'src')
            },
            // webpack5 中废弃了url-loader、file-loader的使用，提供了type: 'asset/resource'的资源默认处理方式
            // {
            //     test: /\.(png|jpe?g|gif|eot|woff|ttf|pdf|svg)$/,
            //     type: 'asset/resource'
            // },
            // 如果仍然要使用url-loader/file-loader，需要添加esModule: false和type: 'javascript/auto'兼容
            {
                test: /\.(png|jpe?g|gif|eot|woff|ttf|pdf)$/,
                // use的配置如果比较复杂，可以接受一个对象数组进行配置
                use: [
                    {
                        // url-loader根据图片内容计算base64编码字符串直接注入到JS代码中
                        // 这么做的目的是减少小图片作为资源需要浏览器单独建立HTTP链接的消耗
                        // 但图片转base64缺点会带来js篇幅过大问题，因此需要使用limit定义小图片的规格
                        loader: 'url-loader',
                        options: {
                            // 30kB以下文件采用url-loader
                            limit: 1024 * 10 ,
                            // 否则使用file-loader
                            // file-loader把JS和CSS中导入图片语句替换成正确的地址，并把文件输出到对应的位置
                            // CSS如：background: url(./img/a.png) 转换后输出 background: url(55276e274...afda24.png); 并在dist文件输出55276e274...afda24.png文件，而这个奇怪的数值是根据图片内容计算的hash值
                            // JS如：import imgB from './img/b.png' 转换后 module.exports = __webpack_require__.p + '8bcc1f8..8429c.png'; 同样是containhash值
                            fallback: 'file-loader',
                            // 关闭url-loader的es6模块化，使用commonjs解析
                            esModule: false
                        }
                    }
                ],
                // 防止资源被打包两次，防止打包出 export default "data...base64..."资源
                type: 'javascript/auto',
            },
            {
                test: /\.svg$/, // 匹配svg矢量图
                // svg也可以使用url-loader/file-loader，但更建议使用svg-inline-loader
                // 由于svg图片本身的特殊性，其就是一个HTML标签，可以直接插入到dom中使用。
                // raw-loader可以把文本文件读取出来，注入到JS或CSS中去，
                // raw-loader示例：import svgContent from './svgs/alert.svg' 转换后 module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\"...</svg>"，地址转换成<svg>html标签后，直接插入dom即document.querySelector('app').innerHTML = svgContent
                // use: ['raw-loader'],
                // 由于raw-loader会直接返回svg文本内容，因此对于css部分是无法使用的。另外raw-loader会返回svg全内容，不会做优化
                // svg-inline-loader 会分析SVG内容，去除不必要部分代码，增加了对SVG的压缩功能。
                // SVG-inline-loader功能与raw-loader功能类似，但更适用。
                use: ['svg-inline-loader']
            }
        ]
    },
    plugins: [
        // MiniCssExtractPlugin使用的是contenthash而不是chunkhash
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
}

