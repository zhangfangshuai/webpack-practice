module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        'airbnb-base', // airbnb-base定义和集成了大量规则的最佳实践，次包带有Airbnb的基础JS，不带有vue和react等插件，因此还需要安装上方vue插件
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'vue',
    ],
    // 覆盖airbnb-base的规则
    rules: {
        indent: ['error', 4], // 换行4个空格
        semi: ['error', 'never'], // 语句结束是否需要分号；always-需要
        'vue/comment-directive': 'off', // 不对页面进行此项检查，避免html也被纳入其中
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }], // 不强制要求依赖装在哪个dependence里
        'global-require': 0, // 禁用该规则：require()必须写在全局里，不能if-else或function等条件判断里。【注】新版本的eslint已废弃本约束，可继续用但不在维护更新
    },
}
