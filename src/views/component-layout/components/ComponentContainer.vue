<template>
  <div class="mulo-cl-container" :class="{
    active:active
  }" @click.stop="onClick">
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
    },

    id: {
      type: Number
    },

    //拖动组件的规则
    componentRule: {
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    //标记选中的组件
    onClick() {
      this.$emit("active");
      this.vm.selectComponent();

    }
  }
};
</script>

<style lang="scss" >
.mulo-cl-container {
  line-height: 1;
  &.active {
    border: 1px solid red;
  }
}
</style>