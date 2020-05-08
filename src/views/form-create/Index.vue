<template>
  <div>
    <form-create ref="asdf" v-model="row" :rules="rules" @submit="submit"></form-create>

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
import jsonToVue from "./../../../package/src/form-create/jsonToVue/index";
import jsonvue from "json2vue";

// 规则编译
import RuleParse from "./../../../package/src/form-create/core/RuleParse";
import maker from "./../../../package/src/form-create/factory/maker";

// maker构建器

export default {
  components: {},
  data() {
    return {
      row: {
        name: "罗戚洪",
        name2: "mulo",
        is_postage: 0
      },
      rules: [
        maker.input("名称", "name", 122),
        maker.type("input"),
        maker.checkbox("是否包邮", "is_postage", "0").options([
          { value: "0", label: "不包邮", disabled: false },
          { value: "1", label: "包邮", disabled: false },
          { value: "2", label: "未知", disabled: true }
        ]),
        maker.switch("是否上架", "is_show", "1").props({
          activeValue: "1",
          inactiveValue: "0"
        }),
        maker.slider("滑块", "slider", [0, 52]).props({
          min: 0,
          max: 100,
          range: true
        }),
        maker.number("排序", "sort", 0)


      ]
    };
  },
  methods: {
    /**
     *
     *
     */
    submit(data) {
      console.log("submit", data);
    },
    /**
     *
     */
    ruleTest() {
      let obj = new RuleParse(this);

      let rule = obj.parse(this.rules);
      console.log("编译后规则", rule);
    },
    getRule() {
      return [maker.input("")];
    },

    makerTest() {
      let Datamaker = maker
        .input("input", "input", 123)
        .props({
          name: "罗戚洪",
          value: "罗戚洪"
        })
        .validate([{ require: true }]);
      console.log(Datamaker.toJson());
    },

    pushBtn() {
      this.rules.push(maker.input("name2", "name2", 122).toJson());
    },
    testClick() {
      console.log("test click");
    }
  },
  created() {
    window.formcrate = this;
  }
};
</script>

<style lang="scss" scoped>
</style>