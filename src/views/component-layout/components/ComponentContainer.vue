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
      default: false,
    },
    //rule的本体对象
    $element: {
      default: false,
    },
    //Render.js vm实例
    vm: {
      default: false,
    },

    id: {
      type: Number,
    },

    //拖动组件的规则
    componentRule: {
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    //标记选中的组件
    onClick() {
      //触发 active 在parse.js中监听进行改变选中的人
      this.$emit("active");
      let componentInstance = this.$children[0];
      this.vm.selectComponent(componentInstance,this.$element);
    },
  },
};
</script>

<style lang="scss">
.mulo-cl-container {
  line-height: 1;
  &.active {
    border: 1px solid red;
  }
}
</style>