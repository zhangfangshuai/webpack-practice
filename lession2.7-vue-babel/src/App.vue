<template>
  <div class="vue-app">{{ msg }}</div>
</template>

<script>
export default {
    data () {
        return {
            msg: 'Welcome to webpack-vue'
        }
    }
}
</script>

<style scoped>
.vue-app {
    font-size: 22px;
    text-align: center;
    color: #d33;
}
</style>
