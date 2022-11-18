/**
 * @func 自定义replace-loader
 * @desc 用于替换项目下特定字符串，一般用作语法转换，或处理某些兼容性bug
 */

// loader原则
// 单一：一个loader只做一件事
// 链式调用：从右往左依次调用
// 模块化：保证输出的是模块化
// 无状态：每一个loader的运行相对独立，不与其他loader产生依赖关联
// 同步或异步：loader支持同步处理和异步处理，这取决于你的需求是否需要等待异步响应，异步调用const callback = this.async()
// ...

/**
 * @func 使用return返回模块数据
 */
function replace(self, source) {
    // 获取到用户的loader配置项中的参数，如 babel-loader?cacheDirectory 中的 cacheDirectory
    // 也可以使用this.query获取
    const options = self.getOptions()
    console.log('【loader参数】', option)
    return source.replace('zhangfs', 'zhangfangshuai')
}

/**
 * @func 使用this.callback返回模块数据
 * @desc this.callback(err, values, sourceMap（可选）)用于返回结果数据比较复杂的场景
 */
function callbackReplace(self, source) {
    const options = self.getOptions()
    const result = source.replace('zhangfs', 'zhangfangshuai')
    self.callback(null, result)
}


/**
 * @func 自定义loader基本结构
 * @param {Object} source - compiler传递给Loader的一个文件原内容
 */
module.exports = function(source) {
    return callbackReplace(this, source)
}
