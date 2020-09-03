<template>
  <el-button>{{text}}</el-button>
</template>

<script>
export default {
  sort: 1,
  title: "按钮",
  children: ["按钮"],
  props: {
    text: {
      type: String,
      default: "按钮"
    },
  },
  data() {
    return {

    };
  },
};
</script>

<style lang="scss" scoped>
</style>