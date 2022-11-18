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
    module: {
        // loader主要用作文件转换、语言翻译，将webpack不识别的语言如css转换成能识别的js-string，再进行打包
        // 多个loader共同作用时有先后顺序，即从右到左
        // webapck5自带有css压缩功能，无需像webpack4那样设定optimization.minimizer
        rules: [
            {
                test: /\.css$/, // 正则匹配
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}

