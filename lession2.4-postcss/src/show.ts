/**
 * @func TypeScript：JavaScript的超集
 * @desc 由于ts是js的超集，直接把后缀 .js 改成 .ts 是可以的。但为了体现出ts的不同，我们重写js代码为如下，加入类型检查
 */

// 给 show 函数增加类型检查
export function show(content:string) {
    document.querySelector('#app').innerHTML = `Hi, ${content}`
}
