<template>
  <div class="mulo-cl-container" :class="{
    active:active
  }" @click="onClick">
    <slot>容器</slot>
  </div>
</template>

<script>
/**
 * 组件容器
 *
 * @logic 实现点击编辑属性, 实现自由变换, 实现拖动
 *
 *
 */
export default {
  name: "cl-container",

  props: {
    active: {
      type: Boolean,
      default: false
    },
    $element: {
      default: false
    },
    vm: {
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    /**
     * 选中, 属性栏页更新
     *
     */
    onClick() {
      console.log(this.$element);
      //   console.log("click");
      this.$emit("active");
    }
  }
};
</script>

<style lang="scss" >
.mulo-cl-container {
  display: unset;
  &.active {
    border: 1px solid red;
  }
  &>*{
      display: block;
  }
}
</style>