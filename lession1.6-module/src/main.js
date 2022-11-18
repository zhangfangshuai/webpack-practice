/**
 * @name 入口文件
 * @desc webpack打包从该文件开始，进行资源依赖分析
 */

require('./css/main.css')  // 引入样式文件

const show = require('./show')
show('webpack in lession6')

