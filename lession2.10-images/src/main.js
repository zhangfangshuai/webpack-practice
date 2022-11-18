/**
 * @name 入口文件
 * @desc webpack打包从该文件开始，进行资源依赖分析
 */

import { createApp } from 'vue'
import App from './views/App.vue'

createApp(App).mount('#app')
