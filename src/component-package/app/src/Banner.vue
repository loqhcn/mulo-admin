<template>
  <div>banner</div>
</template>

<script>
export default {
  props: {
    banners: {
      type: Array,
      default: () => {
        return [
          {
            img:
              "http://cdn.sugongchang.com/default/20200819/008df50c1185a894f2498410b1fa1821.png",
            title: "名称",
          },
        ];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>