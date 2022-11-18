/**
 * @func TypeScript：JavaScript的超集
 * @desc 由于ts是js的超集，直接把后缀 .js 改成 .ts 是可以的。但为了体现出ts的不同，我们重写js代码为如下，加入类型检查
 */

import * as React from 'react'
import { Component } from 'react'
import { render } from 'react-dom'

class Button extends Component {
    render() {
        return <h1>Hello, Webpack-react-babel</h1>
    }
}

render(<Button/>, document.querySelector('#app'))
 