/**
 * @name webpack配置文件
 * @desc 构建运行在Node.js环境中，使用CommonJs规范编写配置对象（CommonJs规范可以直接运行在Node环境中）
 */

const path = require('path')

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    // webpack提供devServer，便于（1）在开发环境启动http服务而不是使用本地预览；（2）实时预览；（3）模块热替换；
    // 使用devServer启动服务时，不会输出dist打包文件，webpack会讲构建出来的文件保存在内存中，因此也不会理会打包的配置output.path等属性，如需更改，需在devServer.static中配置
    devServer: {
        static: {
            directory: path.join(__dirname, '/src/')
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/, // 正则匹配
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}

