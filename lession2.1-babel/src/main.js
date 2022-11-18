/**
 * @func 入口文件
 */

require('./css/common.css')

// 使用es6导入，使用babel-loader进行编译
import { show } from './show.js'

show('webpack in main.js')
