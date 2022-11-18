<template>
    <div class="container">
        <header>{{ title }}</header>
        <div class="images">
            <div class="img-box"></div>
            <img :src="pngSrc" />
        </div>
    </div>
</template>

<script>
import pngSrc1 from '../images/longfor-logo.png'
export default {
  data () {
    return {
      title: 'Hello, webpack-images-vue',
      pngSrc: pngSrc1
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/main.css';

.img-box {
    width: 100px;
    height: 100px;
    background-image: url('../images/longxiaohu.png');
    /* background: red; */
}
</style>
