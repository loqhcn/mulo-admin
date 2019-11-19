<template>
  <div class="home">
    <router-link to="/login">登录</router-link>
    <router-link to="/index">后台主页</router-link>
    <router-link to="/index/table">列表页</router-link>
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
