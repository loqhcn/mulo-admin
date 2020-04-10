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
      rules: [
        {
          type: "div",
          ref: "btn0",
          class: "mulo-form",
          props: {},

          children: [
            // 表单基础
            {
              type: "mulo-form-default",
              props: {},
              children: [
                // 表单row
                {
                  type: "mulo-form-row",
                  props: {
                    title: "姓名"
                  },
                  children: [
                    {
                      type: "el-input",
                      props: {
                        value: ""
                      },
                      children: [],
                      on: {
                        input: event => {
                          console.log("这个input", event);
                          this.$emit("input", event);
                        }
                      }
                    }
                  ]
                },
                // 表单row2
                {
                  type: "mulo-form-row",
                  props: {
                    title: "姓名2"
                  },
                  children: [
                    {
                      type: "el-input",
                      field: "name2",
                      props: {
                        value: ""
                      },
                      children: [],
                      on: {
                        input: event => {
                          console.log("这个input", event);
                          this.$emit("input", event);
                        }
                      }
                    }
                  ]
                },

                {
                  type: "div",
                  field: "name",
                  props: {
                    title: "姓名"
                  },
                  children: ["div测试"],
                  on: {
                    click: e => {
                      console.log(e);
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
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