<template>
  <div class="container-admin">
    <!-- 左侧菜单 -->
    <div class="menu-admin">
      <div class="logo">MuloUi Admin</div>

      <div class="leftmenu full-h">
        <o-menu
          :default-active="activeIndex2"
          class="o-menu-demo"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <o-menu-item index="1">处理中心</o-menu-item>
          <o-submenu index="2">
            <template slot="title">我的工作台</template>
            <o-menu-item index="2-1">
              <router-link to="/index/table">dashboard1</router-link>
            </o-menu-item>
            <o-menu-item index="2-2">选项2</o-menu-item>
            <o-menu-item index="2-3">选项3</o-menu-item>
            <o-submenu index="2-4">
              <template slot="title">选项4</template>
              <o-menu-item index="2-4-1">选项1</o-menu-item>
              <o-menu-item index="2-4-2">选项2</o-menu-item>
              <o-submenu index="2-4-3">
                <template slot="title">选项4</template>
                <o-menu-item index="2-4-3-1">选项1</o-menu-item>
                <o-menu-item index="2-4-3-2">选项2</o-menu-item>
                <o-menu-item index="2-4-3-3"></o-menu-item>
              </o-submenu>
            </o-submenu>
          </o-submenu>
          <o-menu-item index="3">
            <router-link to="/index/table">测试表格</router-link>
          </o-menu-item>
          <o-menu-item index="4">订单管理</o-menu-item>
        </o-menu>
      </div>
    </div>

    <div class="container-content">
      <div class="row flex space-between admin-index-header w100">
        <div class="flex">
          <i class="iconfont iconall"></i>
        </div>
        <div class="flex">
          <div>
            <input type="text" class="form-control" placeholder="搜索..." />
          </div>
          <div>
            <i class="iconfont iconall"></i>
          </div>
        </div>
      </div>
      
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex2: ""
    };
  },
  methods: {
    handleSelect(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="scss" scoped>
$menu_width: 16rem;

.logo{
  color: orange;
  font-size: 20px;
  font-weight: bold;
}
.leftmenu {
  width: $menu_width;
}
.menu-admin {
  position: relative;
}
.menu-admin {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.container-content {
  position: absolute;
  left: $menu_width;
  right: 0;
}
.admin-index-header {
  div > i {
    font-size: 2rem;
  }
}
</style>