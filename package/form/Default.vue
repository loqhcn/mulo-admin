<template>
  <div class="mulo-form-default" :class="{layer:layer}">
    <!-- 表单主体 -->

    <form>
      <div class="form-body">
        <slot></slot>
      </div>

      <!-- 底部按钮组 -->
      <div class="footer">
        <div class="btns">
          <button class="btn">提交</button>
          <button class="btn">取消</button>
          <button type="reset" class="btn">重置</button>
        </div>
      </div>
      
    </form>
  </div>
</template>

<script>

export default {
  name: "form-default",
  props: {
    // 是否为弹出层打开
    layer: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
// 表单组件
.mulo-form-default {
  padding: 1rem;
  .footer {
    margin-top: 2rem;
    .btns {
      .btn + .btn {
        margin-left: 0.5rem;
      }
    }
  }
}
</style>