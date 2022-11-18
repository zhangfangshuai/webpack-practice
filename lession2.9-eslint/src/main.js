/**
 * @func TypeScript：JavaScript的超集
 * @desc 由于ts是js的超集，直接把后缀 .js 改成 .ts 是可以的。但为了体现出ts的不同，我们重写js代码为如下，加入类型检查
 */

// 使用es6导入
import { show } from './show'

require('./css/common.css')

show('webpack in main.js')
