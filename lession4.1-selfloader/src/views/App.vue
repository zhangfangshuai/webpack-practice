<template>
    <div class="container">
        <header>{{ title }}</header>
        <section id="author"></section>
        <div class="images">
            <div class="img-box"></div>
            <img :src="pngSrc" />
        </div>
    </div>
</template>

<script>
import pngSrc1 from '../images/longfor-logo.png'
const author = 'zhangfs'

export default {
  data () {
    return {
      title: 'Hello, webpack-images-vue',
      pngSrc: pngSrc1
    }
  },
  mounted() {
    document.querySelector('#author').innerHTML = `使用了自定义Loader; Author: ${author}`
  }
}
</script>

<style lang="scss" scoped>
@import '../style/main.css';

.img-box {
    width: 100px;
    height: 100px;
    background-image: url('../images/longxiaohu.png');
}
</style>
