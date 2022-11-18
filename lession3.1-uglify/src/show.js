/**
 * @name 模块文件
 */

function show(content) {
    window.document.getElementById('app').innerHTML = 'Hello, ' + content;
}

function next(content) {
    console.log('this is a useless function')
}


module.exports = {
    show,
    next
}
