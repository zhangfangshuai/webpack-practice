<template>
  <div class="container">{{ msg }}</div>
</template>

<script lang="ts">
import Vue from "vue"

// 通过 Vue.extend 启用TypeScript类型推断
export default Vue.extend({
    data() {
        return {
            msg: 'Welcome to webpack-vue-typescript'
        }
    }
})
</script>

<style scoped>
.container {
    font-size: 22px;
    text-align: center;
    color: #d33;
}
</style>