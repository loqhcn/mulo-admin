<template>
  <div>
    <preview-render-rule :value="rules"></preview-render-rule>
  </div>
</template>

<script>
import PreviewRenderRule from "./PreviewRenderRule";
export default {
  name: "preview",
  components: {
    [PreviewRenderRule.name]: PreviewRenderRule
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