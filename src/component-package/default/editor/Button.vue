<template>
  <div v-if="!loading">
    <el-form label-position="top" label-width="80px" :model="row">
      <el-form-item label="名称">
        <el-input v-model="row.text"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import editorMixin from "./../../editorMixin";
export default {
  data() {
    return {
      //初始化时 实例中的数据数据会复制到row上面
      row: {
        text: null,
      },
    };
  },
  mixins: [editorMixin],
};
</script>

<style lang="scss" scoped>
</style>