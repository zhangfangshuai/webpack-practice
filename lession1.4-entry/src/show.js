/**
 * @name 模块文件
 * @desc 被入口文件所依赖
 */

function show(content) {
    window.document.getElementById('app').innerHTML = 'Hello, ' + content;
}

module.exports = show
