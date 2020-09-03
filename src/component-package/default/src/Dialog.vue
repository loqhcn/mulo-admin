<template>
  <div class="dev-dialog">
    <div @click="clickTitle" class="title">{{row.title}}</div>
    <div class="content">
      <input type="text" />
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  sort: 1,
  title: "Dialog",
  name: "Dialog",
  type: "dialog",
  data() {
    return {
      key: "dialog",
      row: {
      
      },
    };
  },
  methods: {
    clickTitle() {
      console.log("clickTitle");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>