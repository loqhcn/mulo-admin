<template>
  <div class="mulo-checkbox-group">
    <el-checkbox
      v-for="(item,index) in options"
      :key="index"
      v-model="selectedsData[index]"
    >{{ item.value }}</el-checkbox>
  </div>
</template>

<script>
import { Checkbox } from "element-ui";
export default {
  name: "checkbox-group",
  watch: {
    selectedsData(newValue, oldValue) {
      if (this.resetIng) {
        //互相监听导致循环问题
        this.resetIng = false;
        return;
      }
      let $selecteds = [];
      newValue.forEach((li, index) => {
        if (li) {
          $selecteds.push(this.options[index].value);
        }
      });
      //刷新model
      this.$emit("change", $selecteds);
    },
    selecteds(newValue, oldValue) {
      console.log("selecteds", newValue);
      // 重置
      if (!newValue || newValue.length == 0) {
        this.resetIng = true;
        this.selectedsData = [];
        this.options.forEach((li, index) => {
          this.selectedsData[index] = false;
        });
      }
    }
  },
  props: {
    selecteds: {
      default: () => {
        return [];
      }
    },
    options: {
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
    if (typeof this.selecteds != "object") {
      this.$emit("change", []);
    }
  },
  model: {
    prop: "selecteds",
    event: "change"
  },
  data() {
    return {
      resetIng: false,
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