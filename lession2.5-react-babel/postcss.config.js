/**
 * @func postcss配置文件
 * @desc postcss全部采用JS编写实现，运行在Node.js之上
 * @desc 写法类似于webpack配置文件
 */

module.exports = {
    plugins: [
        /* 需要使用的插件列表 */
        // postcss-cssnext 插件可以让你使用下一代 CSS 语法编写代码，再通过 PostCSS 转换成目前的浏览器可识别的 CSS，并且该插件还包含给 CSS 自动加前缀的功能。
        // 使用了postcss-cssnext插件后，就无需再使用autoprefixer
        require('postcss-cssnext')
    ]
}
