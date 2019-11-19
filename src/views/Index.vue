<template>
  <div class="container-admin">
    <!-- 左侧菜单 -->
    <div class="menu-admin">
      <div class="logo">MuloUi Admin</div>

      <o-menu>
        <o-menu-item></o-menu-item>      
      </o-menu>

      <div class="menu column drak full">
        <div class="menu-item">
          <a>导航栏1</a>
          <div class="menu-item">
            <a>导航栏1-1</a>
          </div>
          <div class="menu-item">
            <a>导航栏1-1-1</a>
          </div>
          <div class="menu-item">
            <a>导航栏1-1-1-1</a>
          </div>
          <div class="menu-item">
            <a>导航栏1-1-1-2</a>
          </div>
          <div class="menu-item">
            <a>导航栏1-1-1-3</a>
          </div>
        </div>
        <div class="menu-item">
          <a>导航栏</a>
        </div>
        <div class="menu-item">
          <a>导航栏</a>
        </div>
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
export default {};
</script>

<style lang="scss" scoped>
$menu_width: 11rem;
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