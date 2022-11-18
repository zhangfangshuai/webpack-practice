/**
 * @func TypeScript：JavaScript的超集
 * @desc 由于ts是js的超集，直接把后缀 .js 改成 .ts 是可以的。但为了体现出ts的不同，我们重写js代码为如下，加入类型检查
 */

import Vue from "vue"
import App from "./App.vue"

new Vue({
    el: '#app',
    render: h =>h(App)
})
 