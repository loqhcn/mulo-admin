<template>
  <div>
    <preview-render-rule :value="rules"></preview-render-rule>
  </div>
</template>

<script>
import Render from "./Render";
export default {
  name: "preview",
  components: {
    [Render.name]: Render
  },
  props: {
    setting: {
      type: Object,
      default: () => {
        return {};
      }
    },
    rules: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>