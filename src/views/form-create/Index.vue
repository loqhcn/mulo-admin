<template>
  <div>
    <form-create :rules="rules"></form-create>

    <button @click="pushBtn">增加组件</button>
  </div>
</template>

<script>
import jsonToVue from "./../../../package/form-create/jsonToVue/index";
import jsonvue from "json2vue";

export default {
  data() {
    return {
      rules: [
        {
          type: "div",
          ref: "btn0",
          class: "asd",
          props: {
            disabled: false
          },
          children: [
            {
              type: "ElButton",
              ref: "btn1",
              "@click": "testClick",
              props: {
                disabled: false
              },
              on:{
                click: this.testClick
              },
              children: ["按钮1", "按钮2", "按钮3"]
            },
            {
              type: "ElButton",
              ref: "btn2",
              props: {
                disabled: false
              },
              children: ["按钮"]
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