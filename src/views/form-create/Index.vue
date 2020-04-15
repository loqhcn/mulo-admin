<template>
  <div>
    <form-create v-model="row" :rules="rules"></form-create>

    <!-- <mulo-form-default>
      <mulo-form-row title="字段名"></mulo-form-row>
    </mulo-form-default>-->

    <button @click="pushBtn">增加组件</button>
  </div>
</template>

<script>
import jsonToVue from "./../../../package/form-create/jsonToVue/index";
import jsonvue from "json2vue";

import CheckBoxGroup from "./../../../package/checkbox-group/CheckBoxGroup";

export default {
  components: {
    [CheckBoxGroup.name]: CheckBoxGroup
  },
  data() {
    return {
      row: {
        name: "罗戚洪",
        name2: "mulo"
      },
      rules: [],
    };
  },
  methods: {
    pushBtn() {
      this.rules.push({
        type: "ElInput",
        ref: "btn",
        props: {
          disabled: false
        },
        children: ["按钮"]
      });
    },
    testClick() {
      console.log("test click");
    }
  },
  created() {
    function mock() {
      return {
        rule: [
          {
            type: "ElButton",
            ref: "btn",
            props: {
              disabled: true
            },
            children: ["test"]
          }
        ],
        mounted() {
          console.log(this);
        }
      };
    }
    var jv = new jsonvue(mock());
    console.log(jv);
    // var vm = jv.mount('#app');
  }
};
</script>

<style lang="scss" scoped>
</style>