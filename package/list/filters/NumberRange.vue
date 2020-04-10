<template>
  <div class="mulo-filter-number-range">
    <el-input v-model="numberRange[0]" type="number" :placeholder="placeholders[0]"></el-input>
    <span class="range-center-line">-</span>
    <el-input v-model="numberRange[1]" type="number" :placeholder="placeholders[1]"></el-input>
  </div>
</template>

<script>
import { Input } from "element-ui";

export default {
  name: "number-range",
  components: {
    [Input.name]: Input
  },
  watch: {
    numberRange(newValue, oldValue) {
      this.$emit("change", newValue);
    }
  },
  props: {
    numberRange: {
      default: () => {
        return ["", ""];
      }
    },
    placeholders: {
      type: Array,
      default: () => {
        return ["最低", "最高"];
      }
    }
  },
  model: {
    prop: "numberRange",
    event: "change"
  },
  data() {
    return {
      numbers: ["", ""]
    };
  },
  methods: {
    name() {}
  }
};
</script>

<style lang="scss" scoped>
.mulo-filter-number-range {
  display: flex;
  align-items: center;
}
.mulo-filter-number-range .el-input {
  width: 100px;
}
</style>