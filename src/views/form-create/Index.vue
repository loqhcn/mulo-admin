<template>
  <div>
      <form-create></form-create>

  </div>
</template>

<script>
import jsonToVue from "./../../../package/form-create/jsonToVue/index";
import jsonvue from 'json2vue'


export default {
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
    

  }
};
</script>

<style lang="scss" scoped>
</style>