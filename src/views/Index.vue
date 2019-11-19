<template>
  <div class="container-admin">
    <!-- 左侧菜单 -->
    <div class="navmenu-admin">
      <div class="logo">MuloUi Admin</div>
      <div class="navmenu column drak full">
        <div class="navmenu-item">
          <a>导航栏1</a>
          <div class="navmenu-item">
            <a>导航栏1-1</a>
            <div class="navmenu-item">
              <a>导航栏1-1-1</a>
              <div class="navmenu-item">
                <a>导航栏1-1-1-1</a>
              </div>
              <div class="navmenu-item">
                <a>导航栏1-1-1-2</a>
              </div>
              <div class="navmenu-item">
                <a>导航栏1-1-1-3</a>
                <div class="navmenu-item">
                  <a>导航栏1-1-1-3-1导航栏</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="navmenu-item">
          <a>导航栏</a>
        </div>
        <div class="navmenu-item">
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
.navmenu-admin {
  position: relative;
}
.navmenu-admin {
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