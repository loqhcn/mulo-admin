<template>
  <div>
    <form-create v-model="row" :rules="rules"></form-create>

    <!-- <mulo-form-default>
      <mulo-form-row title="字段名"></mulo-form-row>
    </mulo-form-default>-->

    <button @click="pushBtn">增加组件</button>

    <div>
      <h1>测试</h1>
      <div>
        <button @click="ruleTest">规则测试</button>
        <button @click="makerTest">maker生成测试</button>
      </div>
    </div>
  </div>
</template>

<script>
import jsonToVue from "./../../../package/form-create/jsonToVue/index";
import jsonvue from "json2vue";

import CheckBoxGroup from "./../../../package/checkbox-group/CheckBoxGroup";

// 规则编译
import RuleParse from "./../../../package/form-create/core/RuleParse";
import maker from "./../../../package/form-create/factory/maker";

// maker构建器

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
          type: "input",
          title: "商品名称",
          field: "goods_name",
          value: "iphone 7",
          col: {
            span: 12,
            labelWidth: 150
          },
          props: {
            type: "text"
          },
          validate: [
            { required: true, message: "请输入goods_name", trigger: "blur" }
          ]
        }
      ]
    };
  },
  methods: {
    /**
     *
     */
    ruleTest() {
      let obj = new RuleParse(this);

      let rule = obj.parse(this.rules);
      console.log("编译后规则", rule);
    },

    makerTest() {
      let maker = maker.type("input").props({
        name: "罗戚洪",
        value: "罗戚洪"
      }).
      validate({
        
      })
    },

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