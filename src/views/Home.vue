<template>
  <div class="home">
    <router-link to="/login">登录</router-link>
    <router-link to="/index">后台主页</router-link>
   <h1>列表</h1>
    <router-link to="/index/table">列表页</router-link>

    <router-link to="/test-table-1">测试列表页 mulo-list-default</router-link>
    
    <router-link to="/test-select-row">列表选择</router-link>


    <h1>表单</h1>

    <router-link to="/form-create/index">表单</router-link>
    <router-link to="/test-form-1">表单页测试 mulo-form-default</router-link>
    <router-link to="/component-layout/index">组件拖动布局</router-link>

    <h1>操作功能</h1>

    <router-link to="/tools/status">状态修改</router-link>
    <router-link to="/tools/modal">模态框</router-link>
     
     <h1>其他测试页面</h1>
    <router-link to="/test/vnode">vnode测试</router-link>


  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "home",
  components: {}
};
</script>
<style lang="scss">
.home > * {
  display: block;
}
</style>
