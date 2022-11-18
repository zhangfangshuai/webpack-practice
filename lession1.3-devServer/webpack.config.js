/**
 * @name webpack配置文件
 * @desc 构建运行在Node.js环境中，使用CommonJs规范编写配置对象（CommonJs规范可以直接运行在Node环境中）
 */

const path = require('path')
const devMode = process.env.NODE_ENV !== 'production'

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: devMode ? 'development' : 'production',
    entry: './src/main.js',
    output: {
        filename: '[name]_[contenthash:8].js',
        path: path.resolve(__dirname, './dist')
    },
    // webpack提供devServer，便于（1）在开发环境启动http服务而不是使用本地预览；（2）实时预览；（3）模块热替换；
    // 使用devServer启动服务时，不会输出dist打包文件，webpack会讲构建出来的文件保存在内存中，因此也不会理会打包的配置output.path等属性，如需更改，需在devServer.static中配置
    devServer: {
        // 如果没有使用HtmlWebpackPlugin，需要指定要读取的index.html位置，且output.filename必须是写死的，在读取的html文件中提前插入写好
        // static: {
        //     directory: path.join(__dirname, '/src/')
        // },
        hot: true, // 启用模块热替换功能，默认true
        // 针对URL请求，应该返回哪个html文件，但页面应用时设置为true，多页面应用时，配置rewrites数组
        // 该功能在生产环境又Nginx实现路由的页面分发
        historyApiFallback: {
            // 使用正则匹配命中路由
            rewrites: [
                // /user 开头都返回 user.html
                {
                    from: '/^\/user/',
                    to: 'user.html'
                },
                // 其他都返回index.html
                {
                    from: /./,
                    to: '/index.html'
                }
            ]
        },
        // 为HTTP响应头注入信息
        headers: {
            'x-foo': 'bar'
        },
        // 服务监听的地址，如需局域网中的其它设备访问服务，可以在启动DevServer时带上 --host 0.0.0.0。 
        // 默认值是 127.0.0.1 即只有本地可以访问 DevServer 的 HTTP 服务。
        host: 'localhost',
        // 服务启动监听端口
        port: '5000',
        // 配置允许访问的HOST白名单列表
        allowedHosts: [
            // 配置单个域名
            'host.com',
            'sub.host.com',
            // 二级域名通配
            '.host2.com'
        ],
        // 是否启用https协议服务，部分需求如HTTP2和Service Worker都必须使用HTTPS。
        // 启用后DevServer会自动生成HTTPS证书
        https: false,
        // 是否启用gzip压缩
        compress: false,
        // DevServer启动完成后是否自动为你打开浏览器和访问的网址
        open: false
    },
    module: {
        rules: [
            {
                test: [/\.css$/, /\.scss$/], // 正则匹配
                use: ['style-loader', 'css-loader']
            }
        ]
    },

    plugins: [
        // 在output配置的指定path下生成新的index.html文件，它使用script标签引用所有打包完成的chunk包
        new HtmlWebpackPlugin({
            // 根据模版文件生成新html文件，template指定模版html文件位置
            template: './src/index.html',
        })
    ]
}

