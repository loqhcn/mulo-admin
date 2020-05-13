<template>
  <div>
    <div v-if="a">{{msg}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: true,
      msg: "msg123123"
    };
  }
};
</script>

<style lang="scss" scoped>
</style>