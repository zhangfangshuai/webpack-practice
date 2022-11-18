// 告诉 TypeScript 编译器 .vue文件其实是一个Vue

declare module "*.vue" {
    import Vue from "vue"
    export default Vue;
}
