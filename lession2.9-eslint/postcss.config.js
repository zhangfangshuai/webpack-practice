/**
 * @func postcss配置文件
 * @desc postcss全部采用JS编写实现，运行在Node.js之上
 * @desc 写法类似于webpack配置文件
 */

module.exports = {
    plugins: [
        /* 需要使用的插件列表 */
        // postcss-cssnext插件可以让你使用下一代CSS语法编写代码，将其转换成浏览器可识别的CSS，且该插件还自动给CSS加兼容性前缀的功能。
        // 使用了postcss-cssnext插件后，就无需再使用autoprefixer
        require('postcss-cssnext'),
    ],
}
