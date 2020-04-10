<template>
  <div class="mulo-checkbox-group">
    <el-checkbox v-for="(item,index2) in selects" :key="index2" v-model="selectedsData[index]">备选项</el-checkbox>
  </div>
</template>

<script>
import { Checkbox } from "element-ui";
export default {
  name: "checkbox-group",
  props: {
    selecteds: {
      default: []
    },
    selects: {
      type: Array,
      default: () => {
        return [
          { value: "1" },
          { value: "2" },
          { value: "3" },
          { value: "4" },
          { value: "5" },
          { value: "6" }
        ];
      }
    }
  },
  created() {
    //默认值
    if (typeof this.selectedItems != "object") {
      this.$emit("change", []);
    }
  },
  model: {
    prop: "selecteds",
    event: "change"
  },
  data() {
    return {
      selectedsData: [],
      rules: [
        { value: "1" },
        { value: "2" },
        { value: "3" },
        { value: "4" },
        { value: "5" },
        { value: "6" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>