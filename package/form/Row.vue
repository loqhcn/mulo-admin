<template>
  <div class="mulo-form-row">
    <label class="row-title">{{title}}</label>
    <div class="row-body">
        <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "form-row",
  props: {
    title: {
      default: "字段名"
    }
  }
};
</script>

<style lang="scss" scoped>
.mulo-form-row {
  display: flex;
  .row-title {
    width: 5rem;
    padding: 0.1rem;
  }
  .row-body {
      
  }
}
</style>